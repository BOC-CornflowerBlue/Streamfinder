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

  getMovieByTitleFuzzySearch: (title, confidenceScoreLimit = 0, resultsLimit = 1) => {
    const validResults = [];
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getMovieByTitleFuzzySearch title: ', title);
      try {
        Movie.fuzzySearch(title)
        .then(results => {
          if (results.length > 0) {
            Logger.consoleLog('getMovieByTitleFuzzySearch DB - Found movie:', results[0]?.title);
            Logger.consoleLog('confidenceScore:', results[0]?.confidenceScore);

            const maxResults = Math.min(results.length, resultsLimit);
            for (let i = 0; i < maxResults; i++) {
              if (results[i].confidenceScore >= confidenceScoreLimit) {
                validResults.push(results[i]);
              }
            }
            resolve(validResults);
          } else {
            Logger.consoleLog('getMovieByTitleFuzzySearch DB - No movie found!');
            resolve(validResults)
          }
        })
        .catch(error => {
          Logger.consoleLog(`Error in getting movie ${title} from the database with fuzzySearch`, error);
          resolve(validResults);
        });
      } catch (error) {
        Logger.consoleLog(`Exception thrown in getting movie ${title} from the database with fuzzySearch`, error);
        resolve(validResults);
      }
    });
  },

  getSimilar:  (movieId) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getSimilar movieId: ', movieId);
      resolve();
    });
  },
};