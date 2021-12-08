const { Logger } = require('../../logger.js');
const { Movie } = require('./database.js');

module.exports = {
  getMovieByTitle: (title) => {
    return new Promise((resolve, reject) => {
      Movie.findOne({ title })
      .then(result => {
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
      try {
        Movie.fuzzySearch(title)
        .then(results => {
          if (results?.length > 0) {
            const maxResults = Math.min(results.length, resultsLimit);
            for (let i = 0; i < maxResults; i++) {
              if (results[i].confidenceScore >= confidenceScoreLimit) {
                validResults.push(results[i]);
              }
            }
            resolve(validResults);
          } else {
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
  }
};