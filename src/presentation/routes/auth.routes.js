const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

module.exports = router;
