const { Logger } = require('../../logger.js');
const { Movie } = require('./database.js');

module.exports = {
  getMovieByTitle: (title) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getMovieByTitle title: ', title);
      Movie.findOne({ title })
      .then(result => {
        Logger.consoleLog('getMovieByTitle DB - Found movie:', result?.title);
        resolve(result);
      })
      .catch(error => {
        Logger.consoleLog(`Error in getting movie ${title} from the database`, error);
        reject(error);
      });
    });
  },

  getMovieByTitleFuzzySearch: (title, confidenceScoreLimit = 0) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getMovieByTitleFuzzySearch title: ', title);
      Movie.fuzzySearch(title)
      .then(result => {
        if (result.length > 0) {
          Logger.consoleLog('getMovieByTitleFuzzySearch DB - Found movie:', result[0]?.title);
          Logger.consoleLog('confidenceScore:', result[0]?.confidenceScore);
          if (result[0]?.confidenceScore >= confidenceScoreLimit) {
            resolve(result[0]);
          } else {
            resolve();
          }
        } else {
          Logger.consoleLog('getMovieByTitleFuzzySearch DB - No movie found!');
          resolve()
        }
      })
      .catch(error => {
        Logger.consoleLog(`Error in getting movie ${title} from the database with fuzzySearch`, error);
        reject(error);
      });
    });
  },

  getSimilar:  (movieId) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getSimilar movieId: ', movieId);
      resolve();
    });
  },
};