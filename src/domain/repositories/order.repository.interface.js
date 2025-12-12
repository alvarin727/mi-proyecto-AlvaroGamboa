class OrderRepository {
  constructor() {
    if (this.constructor === OrderRepository) {
      throw new Error("Cannot instantiate abstract class");
    }
  }
  async getById(id) { throw new Error("Method 'getById()' must be implemented."); }
  async create(order) { throw new Error("Method 'create()' must be implemented."); }
  async updateStatus(id, status, meta) { throw new Error("Method 'updateStatus()' must be implemented."); }
  async listByUser(userId) { throw new Error("Method 'listByUser()' must be implemented."); }
}
module.exports = OrderRepository;
