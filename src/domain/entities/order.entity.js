class Order{
    constructor(id, product, description, quantity, price, discount, total) {
        this.id = id;
        this.product = product;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.total = total;
    }
}

module.exports = Order;