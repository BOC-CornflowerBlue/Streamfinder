const { Logger } = require('../../logger.js');
const { Movie } = require('./database.js');

module.exports = {
  getMovieByTitle: (title) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getMovieByTitle title: ', title);
      Movie.findOne({ title })
      .then(result => {
        Logger.consoleLog('Found movie:', result);
        //const finalSearch = transformToSearchDisplay(result);
        //resolve(finalSearch);
        resolve(result);
      })
      .catch(error => {
        Logger.consoleLog(`Error in getting movie ${title} from the database`, error);
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