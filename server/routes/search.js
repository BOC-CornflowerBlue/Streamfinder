'use strict';

const router = require('express').Router();

const searchValidator = require('../search/searchValidator');
const searchController = require('../search/searchController');

// router.post('/login', searchValidator.validateLogin, searchController.login); // Verify username / password
// router.get('/user', searchController.getUser); // Return account data / settings
// router.post('/user', searchValidator.validateUser, searchController.postUser); // Add new user account
// router.put('/user', searchController.putUser);   // Modify existing user account

module.exports = router;