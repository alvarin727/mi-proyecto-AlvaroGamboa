const { Router } = require('express');
const UserController = require('../controller/user.controller');
const UserService = require('../../application/use-cases/user.service');
const UserMongoRepository = require('../../infrastructure/repositories/database/mongo/user.mongo.repository');
const RoleMongoRepository = require('../../infrastructure/repositories/database/mongo/role.mongo.repository');

const userRepository = new UserMongoRepository();
const roleRepository = new RoleMongoRepository();
const userService = new UserService(userRepository, roleRepository);
const userController = new UserController(userService);

const router = Router();
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
