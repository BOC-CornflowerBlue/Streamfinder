//import db functions
//create helper functions that query db (and can be exported, impoorted into controller file when request comes in)


const {Movie, User} = require('../database/database.js');

module.exports = {
  getUserSubs: (userId) => {
    return new Promise((resolve, reject) => {
      User.find({currentId: userId})
        .then((userData) => {
          if (!userData[0]) {
            reject('User data unavailable');
          } else {
            let subsArray = [];
            let subsObjArray = userData[0].subscriptions;
            if (subsObjArray) {
              for (let i = 0; i < subsObjArray.length; i++) {
                subsArray.push(subsObjArray[i].name);
              }
            }
            resolve(subsArray);
          }
        });
    });
  },

  getMediaInfo: (mediaId) => {
    return new Promise((resolve, reject) => {
      Movie.find({id: mediaId})
        .then((mediaData) => {
          let mediaObject = mediaData[0];
          resolve(mediaObject);
        });
    });
  },

  putMediaObjInUserWatchHistory: (userId, mediaObj) => {
    return new Promise((resolve, reject) => {
      let filter = {currentId: userId};
      let update = {$push: { history: mediaObj}};
      let options = {new: true, upsert: true};
      User.findOneAndUpdate(filter, update, options, (err, data) => {
        if (err) {
          console.log('ERROR in putMediaObjInUserWatchHistory: ', err);
          reject(err);
        } else {
          console.log('SUCCESS updating media');
          resolve(data);
        }
      });
    });
  },

  putNewRating: (mediaId, currentRating, currentRatingCount, rating) => {
    let newRatingCount = currentRatingCount + 1;
    let newRating = ((currentRating * currentRatingCount) + rating) / newRatingCount;
    let newRatingRounded = Number(newRating.toFixed(1));
    return new Promise((resolve, reject) => {
      let filter = {id: mediaId};
      let update = {rating: newRatingRounded, ratingCount: newRatingCount};
      let options = {new: true, upsert: true};
      Movie.findOneAndUpdate(filter, update, options, (err, data) => {
        if (err) {
          console.log('ERROR in putNewRating: ', err);
          reject(err);
        } else {
          console.log('SUCCESS adding rating');
          resolve(data);
        }
      });
    });
  }
};