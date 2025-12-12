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
router.get('/', asyncHandler(cuponController.getAll));
router.get('/:id', asyncHandler(cuponController.getById));
router.post('/', [authenticateToken, isAdmin], asyncHandler(cuponController.create));
router.put('/:id', [authenticateToken, isAdmin], asyncHandler(cuponController.update));
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(cuponController.delete));

module.exports = router;
