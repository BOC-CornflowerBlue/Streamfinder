'use strict';

const router = require('express').Router();

const searchValidator = require('../search/searchValidator');//Use if needed otherwise delete
const searchController = require('../search/searchController');

router.post('/searchPost', searchController.getSearchInfo); //Handles search request
// router.get('/user', searchController.getUser); //Use if needed otherwise delete

module.exports = router;