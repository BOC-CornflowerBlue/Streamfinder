'use strict';
const router = require('express').Router();
const searchController = require('../search/searchController');
const fuzzySearchcontroller = require('../fuzzySearch/fuzzySearchController');

router.post('/searchPost', searchController.getSearchInfo);
router.get('/fuzzy', fuzzySearchcontroller.getFuzzySearch);

module.exports = router;