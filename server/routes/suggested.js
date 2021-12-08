'use strict';
const router = require('express').Router();
const controller = require('../suggested/suggestedController');

router.get('/movies', controller.getSuggested);

module.exports = router;