'use strict';
const {getUserSubs, getMediaInfo, putMediaObjInUserWatchHistory, putNewRating} = require('./mediaDetailDB.js');
const { Logger } = require('../../logger.js');

module.exports = {
  getUserSubscriptions: (req, res, next) => {
    // TODO: Use params req object
    const userId = req.url.split('?')[1];
    getUserSubs(userId).then((subs) => {
      res.send(subs);
    });
  },

  getMediaDetails: (req, res, next) => {
    // TODO: Use params req object
    const mediaId = req.url.split('?')[1];
    getMediaInfo(mediaId).then((details) => {
      res.send(details);
    });
  },

  //will refactor once history is hashed out...
  //are we showing search history or watch history
  putHistoryAndRating: (req, res, next) => {
    // TODO: Use params req object
    const userId = req.url.split('?')[1];
    const mediaId = req.url.split('?')[2];
    const rating = (req.url.split('?')[3]) * 2;
    getMediaInfo(mediaId).then((mediaObj) => {
      let currentRating = mediaObj.rating;
      let currentRatingCount = mediaObj.ratingCount;

      // TODO: Bundle below into a Promise.All statement as order does not matter
      // TODO: Refactor out new rating calc performed in putNewRating into new method
      putMediaObjInUserWatchHistory(userId, mediaObj).then((response2) => {
        putNewRating(mediaId, currentRating, currentRatingCount, rating).then((response3) => { // response3 contains updated rating
          res.sendStatus(200);
        });
      });
    });
  }
};
