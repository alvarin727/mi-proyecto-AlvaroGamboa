const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find();
        return orders.map(o => new Order(o._id.toString(), o.product, o.description, o.price, o.quantity, o.discount, o.total));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return new Order(order._id.toString(), order.product, order.description, order.price, order.quantity, order.discount, order.total);
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            product: orderEntity.product,
            description: orderEntity.description,
            price: orderEntity.price,
            quantity: orderEntity.quantity,
            discount: orderEntity.discount,
            total: orderEntity.total
        });
        const savedOrder = await newOrder.save();
        return new Order(savedOrder._id.toString(), savedOrder.product, savedOrder.description, savedOrder.price, savedOrder.quantity, savedOrder.discount, savedOrder.total);
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            product: orderEntity.product,
            description: orderEntity.description,
            price: orderEntity.price,
            quantity: orderEntity.quantity,
            discount: orderEntity.discount,
            total: orderEntity.total
        }, { new: true });

        if (!updatedOrder) return null;
        return new Order(updatedOrder._id.toString(), updatedOrder.product, updatedOrder.description, updatedOrder.price, updatedOrder.quantity, updatedOrder.discount, updatedOrder.total);
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;