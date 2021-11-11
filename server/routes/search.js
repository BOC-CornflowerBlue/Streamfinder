'use strict';
const router = require('express').Router();
const searchController = require('../search/searchController');

router.post('/searchPost', searchController.getSearchInfo); // Handles search request

module.exports = router;