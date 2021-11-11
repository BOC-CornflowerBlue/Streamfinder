'use strict';

const router = require('express').Router();

router.get('/watch', (req, res, next) => {
  console.log('GET /watch', req.query);
  next();
}); // Return account data / settings

router.post('/watch', (req, res, next) => {
  console.log('POST /watch', req.body);
  next();
}); // Add new user account

router.put('/watch', (req, res, next) => {
  console.log('PUT /watch', req.body);
  next();
}); // Modify existing user account

const homeController = require('../home/homeController');
router.get('/homePage?', homeController.getHomeInfo); //Gets information for home page

module.exports = router;