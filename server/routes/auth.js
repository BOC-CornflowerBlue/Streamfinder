'use strict';

const router = require('express').Router();

const authValidator = require('../auth/authValidator');
const authController = require('../auth/authController');

router.post('/verify', authController.verifySession);
router.post('/login', authValidator.validateLogin, authController.login); // Verify username / password
router.get('/user', authController.getUser); // Return account data / settings
router.post('/user', authValidator.validateUser, authController.postUser); // Add new user account
router.put('/user', authController.putUser);   // Modify existing user account

module.exports = router;