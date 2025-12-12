class OrderItem {
  constructor(productId, quantity, unitPrice) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.lineTotal = unitPrice * quantity;
  }
}

class Order {
  constructor(id, userId, cuponId, items, subtotal, discount, total, status, paidAt) {
    this.id = id;
    this.userId = userId;    
    this.cuponId = cuponId;   //opcional
    this.items = items;       
    this.subtotal = subtotal; 
    this.discount = discount; 
    this.total = total;       
    this.status = status;     
    this.paidAt = paidAt || null;
  }
}

module.exports = { Order, OrderItem };
