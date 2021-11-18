const { Logger } = require('../../logger.js');
const { Movie, User } = require('../database/database.js');

module.exports = {
  getMovie:  (movieId) => {
    if (movieId) {
      // TODO: FindOne
      return new Promise((resolve, reject) => {
        Movie.find({id: movieId})
        .then((movieData) => {
          resolve(movieData[0]);
        })
        .catch((error) => {
          Logger.consoleLog('getMovie error', error);
          reject(error);
        });
      });
    }
  },
  getHistory: (user) => {
    // TODO: FindOne
    return new Promise((resolve, reject) => {
      User.find({ username: user })
        .then((data) => {
          resolve(data[0])
        })
        .catch((error) => {
          Logger.consoleLog('getHistory error', error);
          reject(error);
        });
    });
  }
};