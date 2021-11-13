'use strict';
const { submitUserReview } = require('./reviewsDB.js');
const { sendErrorResponse, sendResponse } = require('../helpers');

module.exports = {
  submitReview: (req, res, next) => {
    const { mediaId, username, userReview, userStarRating } = req.body;
    console.log('REVIEWS CONTROLLER REQ ======= ', req.body);
    submitUserReview(mediaId, username, userReview, userStarRating).then((updatedMovieReviews) => {
      console.log('REVIEWS CONTROLLER: UPDATED MOVIE REVIEWS ======= ', updatedMovieReviews);
      res.send(updatedMovieReviews);
    });
  }
};
