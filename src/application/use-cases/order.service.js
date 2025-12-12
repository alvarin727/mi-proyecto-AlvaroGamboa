const { Order, OrderItem } = require('../../domain/entities/order.entity');
const { NotFoundError } = require('../../domain/errors');

class OrderService {
  constructor(orderRepository, userRepository, productRepository, cuponRepository) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.cuponRepository = cuponRepository;
  }

  // ---- READS ----
  async getAll() {
    return this.orderRepository.getAll();
  }

  async getOrderById(id) {
    const order = await this.orderRepository.getById(id);
    if (!order) throw new NotFoundError(`Order with id ${id} not found`);
    return order;
  }

  async listOrdersByUser(userId) {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new NotFoundError(`User with id ${userId} not found`);
    return this.orderRepository.listByUser(userId);
  }

  // ---- CREATE (NO toca stock) ----
  async createOrder({ userId, cuponId, items }) {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new NotFoundError(`User with id ${userId} not found`);
    if (!Array.isArray(items) || items.length === 0) throw new Error('EMPTY_ITEMS');

    const orderItems = [];
    for (const it of items) {
      const p = await this.productRepository.getById(it.productId);
      if (!p) throw new NotFoundError(`Product with id ${it.productId} not found`);
      if (p.stock < it.quantity) throw new Error('INSUFFICIENT_STOCK'); // prever el pago
      orderItems.push(new OrderItem(p.id, it.quantity, p.price));
    }

    const subtotal = orderItems.reduce((s, l) => s + l.lineTotal, 0);

    let discount = 0;
    if (cuponId) {
      const c = await this.cuponRepository.getById(cuponId);
      if (!c) throw new NotFoundError(`Cupon with id ${cuponId} not found`);
      const now = new Date();
      if (String(c.id_user) !== String(userId)) throw new Error('CUPON_NOT_FOR_USER');
      if (now < new Date(c.fecha_ini) || now > new Date(c.fecha_exp)) throw new Error('CUPON_EXPIRED');
      discount = Math.min(Number(c.monto || 0), subtotal);
    }

    const total = subtotal - discount;

    const orderEntity = new Order(
      null, userId, cuponId || null, orderItems,
      subtotal, discount, total, 'PENDING', null
    );

    return this.orderRepository.create(orderEntity);
  }

  // ---- UPDATE (solo si NO está pagada) ----
  async updateOrder(id, { cuponId, items }) {
    const existing = await this.getOrderById(id);
    if (existing.status === 'PAID') {
      throw new Error('ORDER_ALREADY_PAID_CANNOT_EDIT');
    }

    // Si no mandan items, conservar los existentes
    const inputItems = Array.isArray(items) && items.length > 0 ? items : existing.items;

    // Recalcular totales desde catálogo
    const orderItems = [];
    for (const it of inputItems) {
      const p = await this.productRepository.getById(it.productId);
      if (!p) throw new NotFoundError(`Product with id ${it.productId} not found`);
      if (p.stock < it.quantity) throw new Error('INSUFFICIENT_STOCK');
      orderItems.push(new OrderItem(p.id, it.quantity, p.price));
    }

    const subtotal = orderItems.reduce((s, l) => s + l.lineTotal, 0);

    // Usar cuponId entrante si viene, si no mantener el actual
    const effectiveCuponId = cuponId !== undefined ? cuponId : existing.cuponId;

    let discount = 0;
    if (effectiveCuponId) {
      const c = await this.cuponRepository.getById(effectiveCuponId);
      if (!c) throw new NotFoundError(`Cupon with id ${effectiveCuponId} not found`);
      const now = new Date();
      if (String(c.id_user) !== String(existing.userId)) throw new Error('CUPON_NOT_FOR_USER');
      if (now < new Date(c.fecha_ini) || now > new Date(c.fecha_exp)) throw new Error('CUPON_EXPIRED');
      discount = Math.min(Number(c.monto || 0), subtotal);
    }

    const total = subtotal - discount;

    return this.orderRepository.update(id, {
      cuponId: effectiveCuponId || undefined,
      items: orderItems,
      subtotal,
      discount,
      total
    });
  }

  // ---- PAY (descuenta stock aquí) ----
  async markPaid(id) {
    const order = await this.orderRepository.getById(id);
    if (!order) throw new NotFoundError(`Order with id ${id} not found`);
    if (order.status !== 'PENDING') return order;

    // Descontar stock ahora
    for (const it of order.items) {
      const p = await this.productRepository.getById(it.productId);
      if (!p) throw new NotFoundError(`Product with id ${it.productId} not found`);
      if (p.stock < it.quantity) throw new Error('INSUFFICIENT_STOCK_AT_PAYMENT');
      await this.productRepository.update(p.id, { ...p, stock: p.stock - it.quantity });
    }

    return this.orderRepository.updateStatus(id, 'PAID', { paidAt: new Date() });
  }

  // ---- CANCEL (si está PENDING: no toca stock; si está PAID: repone stock) ----
  async cancel(id) {
    const order = await this.orderRepository.getById(id);
    if (!order) throw new NotFoundError(`Order with id ${id} not found`);

    if (order.status === 'PENDING') {
      return this.orderRepository.updateStatus(id, 'CANCELED');
    }

    if (order.status === 'PAID') {
      // Reponer stock
      for (const it of order.items) {
        const p = await this.productRepository.getById(it.productId);
        if (p) {
          await this.productRepository.update(p.id, { ...p, stock: p.stock + it.quantity });
        }
      }
      return this.orderRepository.updateStatus(id, 'CANCELED');
    }

    // Si ya está cancelada, devolverla tal cual
    return order;
  }
}

module.exports = OrderService;
