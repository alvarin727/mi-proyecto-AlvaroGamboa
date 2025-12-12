const { Router } = require('express');
const asyncHandler = require('../utils/async.handler');

// DI repos
const OrderMongoRepository = require('../../infrastructure/repositories/database/mongo/order.mongo.repository');
const UserMongoRepository = require('../../infrastructure/repositories/database/mongo/user.mongo.repository');
const ProductMongoRepository = require('../../infrastructure/repositories/database/mongo/product.mongo.repository');
const CuponMongoRepository = require('../../infrastructure/repositories/database/mongo/cupon.mongo.repository');

const OrderService = require('../../application/use-cases/order.service');
const OrderController = require('../controller/order.controller');

const orderRepo = new OrderMongoRepository();
const userRepo = new UserMongoRepository();
const productRepo = new ProductMongoRepository();
const cuponRepo = new CuponMongoRepository();

const orderService = new OrderService(orderRepo, userRepo, productRepo, cuponRepo);
const orderController = new OrderController(orderService);

const router = Router();

router.post('/', asyncHandler(orderController.create));
router.post('/:id/pay', asyncHandler(orderController.pay));
router.post('/:id/cancel', asyncHandler(orderController.cancel));
router.get('/:id', asyncHandler(orderController.getById));
router.get('/user/:userId', asyncHandler(orderController.listByUser));

module.exports = router;
