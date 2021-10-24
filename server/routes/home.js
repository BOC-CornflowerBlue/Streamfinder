'use strict';

const router = require('express').Router();

const homeValidator = require('../home/homeValidator');
const homeController = require('../home/homeController');

// router.post('/login', homeValidator.validateLogin, homeController.login); // Verify username / password
// router.get('/user', homeController.getUser); // Return account data / settings
// router.post('/user', homeValidator.validateUser, homeController.postUser); // Add new user account
// router.put('/user', homeController.putUser);   // Modify existing user account

module.exports = router;