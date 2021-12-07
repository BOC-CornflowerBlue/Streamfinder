'use strict';

const router = require('express').Router();
const reviewsController = require('../reviews/reviewsController');

router.post('/submit-review', reviewsController.submitReview);

module.exports = router;