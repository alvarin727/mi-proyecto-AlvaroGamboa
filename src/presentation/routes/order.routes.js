const { Router } = require('express');
const asyncHandler = require('../utils/async.handler');

// DI repos


const OrderMongoRepository = require('../../infrastructure/repositories/database/mongo/order.mongo.repository');
const UserMongoRepository = require('../../infrastructure/repositories/database/mongo/user.mongo.repository');
const ProductMongoRepository = require('../../infrastructure/repositories/database/mongo/product.mongo.repository');
const CuponMongoRepository = require('../../infrastructure/repositories/database/mongo/cupon.mongo.repository');

const OrderService = require('../../application/use-cases/order.service');
const OrderController = require('../controller/order.controller');

const authenticateToken = require('../middlewares/auth.middleware');
const isCustomer = require('../middlewares/customer.middleware');


const orderRepo = new OrderMongoRepository();
const userRepo = new UserMongoRepository();
const productRepo = new ProductMongoRepository();
const cuponRepo = new CuponMongoRepository();

const orderService = new OrderService(orderRepo, userRepo, productRepo, cuponRepo);
const orderController = new OrderController(orderService);

const router = Router();


/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: The created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       409:
 *         description: order already exists
 */
router.post('/', [authenticateToken, isCustomer],asyncHandler(orderController.create));




/**
 * @swagger
 * /order/{id}/pay:
 *   put:
 *     summary: Pay order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Order payed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.put('/:id/pay',[authenticateToken, isCustomer] ,asyncHandler(orderController.pay));



/**
 * @swagger
 * /order/{id}/cancel:
 *   put:
 *     summary: Cancel order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Order canceled.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.put('/:id/cancel', [authenticateToken, isCustomer],asyncHandler(orderController.cancel));



/**
 * @swagger
 * /oder/{id}:
 *   get:
 *     summary: Retrieve a single order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: order not found
 */

router.get('/:id', asyncHandler(orderController.getById));





/**
 * @swagger
 * /oder/{id}:
 *   get:
 *     summary: Retrieve a list of order by ID user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of orders by ID user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found for this user
 */
router.get('/user/:userId', asyncHandler(orderController.listByUser));

module.exports = router;
