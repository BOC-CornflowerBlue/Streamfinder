'use strict';
const { submitUserReview } = require('./reviewsDB.js');
const { sendErrorResponse, sendResponse } = require('../helpers');

module.exports = {
  submitReview: (req, res, next) => {
    const { mediaId, username, userReview } = req.body;
    console.log('REVIEWS CONTROLLER REQ ======= ', req.body);
    submitUserReview(mediaId, username, userReview).then((subs) => {
      res.send(subs);
    });
  }
};
