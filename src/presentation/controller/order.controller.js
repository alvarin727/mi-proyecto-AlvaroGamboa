class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  create = async (req, res) => {
    const created = await this.orderService.createOrder({
      userId: req.body.userId,
      cuponId: req.body.cuponId,
      items: req.body.items
    });
    res.status(201).json(created);
  };

  pay = async (req, res) => {
    const paid = await this.orderService.markPaid(req.params.id);
    res.status(200).json(paid);
  };

  getById = async (req, res) => {
    const order = await this.orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  };

  listByUser = async (req, res) => {
    const list = await this.orderService.listOrdersByUser(req.params.userId);
    res.status(200).json(list);
  };

  cancel = async (req, res) => {
    const canceled = await this.orderService.cancel(req.params.id);
    res.status(200).json(canceled);
  };
}

module.exports = OrderController;
