const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const { Order } = require('../../../../domain/entities/order.entity');

function mapDoc(o) {
  return new Order(
    o._id.toString(),
    o.userId?.toString(),
    o.cuponId ? o.cuponId.toString() : null,
    o.items.map(i => ({
      productId: i.productId.toString(),
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      lineTotal: i.lineTotal
    })),
    o.subtotal, o.discount, o.total, o.status, o.paidAt || null
  );
}

class OrderMongoRepository extends OrderRepository {
  async getAll() {
    const list = await OrderModel.find();
    return list.map(mapDoc);
  }

  async getById(id) {
    const o = await OrderModel.findById(id);
    return o ? mapDoc(o) : null;
  }





  async create(orderEntity) {

    let cupon_discount = 0;
  let cupon = null;

  // 1. Si viene cupón
  if (orderEntity.cuponId) {
    cupon = await Cupon.findById(orderEntity.cuponId);

    if (!cupon) {
      throw new Error('Cupón no válido');
    }

    // 2. Obtener el valor del cupón
    cupon_discount = cupon.value;
  }

    const doc = new OrderModel({
      userId: orderEntity.userId,
      cuponId: orderEntity.cuponId || undefined,
      items: orderEntity.items,
      subtotal: orderEntity.subtotal,
      discount: cupon_discount,
      total: orderEntity.subtotal-orderEntity.total,
      status: orderEntity.status
    });
    const saved = await doc.save();
    return this.getById(saved._id.toString());
  }

  // editar campos completos (items/subtotales/etc)
  async update(id, fields) {
    const updated = await OrderModel.findByIdAndUpdate(id, { $set: fields }, { new: true });
    return updated ? mapDoc(updated) : null;
  }

  async updateStatus(id, status, meta = {}) {
    const patch = { status, ...meta };
    if (status === 'PAID' && !patch.paidAt) patch.paidAt = new Date();
    const updated = await OrderModel.findByIdAndUpdate(id, { $set: patch }, { new: true });
    return updated ? mapDoc(updated) : null;
  }

  async listByUser(userId) {
    const list = await OrderModel.find({ userId });
    return list.map(mapDoc);
  }
}

module.exports = OrderMongoRepository;
