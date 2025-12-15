const { Router } = require('express');
const CuponController = require('../controller/cupon.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/async.handler');


// Esta es la "Inyección de Dependencias" manual
const CuponService = require('../../application/use-cases/cupon.service');

const CuponMongoRepository = require('../../infrastructure/repositories/database/mongo/cupon.mongo.repository');
const cuponRepository = new CuponMongoRepository();

const cuponService = new CuponService(cuponRepository);
const cuponController = new CuponController(cuponService);

const router = Router();



/**
 * @swagger
 * /cupon:
 *   get:
 *     summary: Retrieve a list of cupons
 *     responses:
 *       200:
 *         description: A list of cupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cupon'
 */

router.get('/', asyncHandler(cuponController.getAll));


/**
 * @swagger
 * /cupon/{id}:
 *   get:
 *     summary: Retrieve a single cupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single cupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       404:
 *         description: cupon not found
 */

router.get('/:id', asyncHandler(cuponController.getById));






/**
 * @swagger
 * /cupon:
 *   post:
 *     summary: Create a new cupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CuponInput'
 *     responses:
 *       201:
 *         description: The created cupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       400:
 *         description: Bad request
 *       409:
 *         description: cupon already exists
 */

router.post('/', [authenticateToken, isAdmin], asyncHandler(cuponController.create));




/**
 * @swagger
 * /cupon/{id}:
 *   put:
 *     summary: Update a cupon
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
 *             $ref: '#/components/schemas/CuponInput'
 *     responses:
 *       200:
 *         description: The updated cupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       404:
 *         description: Cupon not found
 */

router.put('/:id', [authenticateToken, isAdmin], asyncHandler(cuponController.update));



/**
 * @swagger
 * /cupon/{id}:
 *   delete:
 *     summary: Delete a cupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: cupon not found
 */
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(cuponController.delete));

module.exports = router;
