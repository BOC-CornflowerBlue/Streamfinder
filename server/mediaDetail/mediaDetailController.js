'use strict';
const {getUserSubs, getMediaInfo, putMediaObjInUserWatchHistory, putNewRating} = require('./mediaDetailDB.js');
const {
  sendErrorResponse,
  sendResponse
} = require('../helpers');

module.exports = {
  getUserSubscriptions: (req, res, next) => {
    const userId = req.url.split('?')[1];
    getUserSubs(userId)
      .then((subs) => {
        res.send(subs);
      })
      .catch(err => {
        res.send(['No subscriptions available']);
      });
  },

  getMediaDetails: (req, res, next) => {
    const mediaId = req.url.split('?')[1];
    getMediaInfo(mediaId).then((details) => {
      res.send(details);
    });
  },

  //will refactor once history is hashed out...
  //are we showing search history or watch history
  putHistoryAndRating: (req, res, next) => {
    const userId = req.url.split('?')[1];
    const mediaId = req.url.split('?')[2];
    const rating = (req.url.split('?')[3]) * 2;
    getMediaInfo(mediaId).then((mediaObj) => {
      let currentRating = mediaObj.rating;
      let currentRatingCount = mediaObj.ratingCount;
      putMediaObjInUserWatchHistory(userId, mediaObj).then((response2) => {
        putNewRating(mediaId, currentRating, currentRatingCount, rating).then((response3) => {
          res.sendStatus(200);
        });
      });
    });
  }
};
