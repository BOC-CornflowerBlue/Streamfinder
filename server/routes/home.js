'use strict';

const router = require('express').Router();

const homeValidator = require('../home/homeValidator');
const homeController = require('../home/homeController');

router.get('/homePage', homeController.getHomeInfo); //Gets information for home page

module.exports = router;