const { Logger } = require('../../logger.js');
const {
  getMovieByTitle: getMovieByTitleDB,
  getMovieByTitleFuzzySearch: getMovieByTitleFuzzySearchDB
} = require('../database/databaseController.js');
const { getMovieByTitle: getMovieByTitleAPI } = require('../api/apiController.js');
const { model: relatedModel } = require('../related/RelatedModel.js');



const model = {};

const getMovie = (title) => {
  Logger.consoleLog('getMovie');
  return new Promise((resolve, reject) => {
    getExactMovie(title)
    .then(exactMovie => {
      Logger.consoleLog('exactMovie: ', exactMovie?.title);
      if (exactMovie && exactMovie.title) {
        Logger.consoleLog('Returning exact movie!');
        resolve(exactMovie);
      } else {
        getFuzzyMovie(title)
        .then(fuzzyMovie => {
          if (fuzzyMovie && fuzzyMovie.title) {
            resolve(fuzzyMovie);
          } else {
            Logger.consoleLog('getMovie: No movie found!');
            resolve([]);
          }
        })
      }
    })
    .catch(error => {
      Logger.consoleLog('getMovie error:', error);
      reject(error);
    })
  });
};

const getExactMovie = (title) => {
  Logger.consoleLog('getExactMovie');
  return new Promise((resolve, reject) => {
    getMovieByTitleDB(title)
    .then(movie => {
      Logger.consoleLog('getExactMovie: ', movie?.title);
      if (movie) {
        resolve(movie);
      } else {
        Logger.consoleLog('oops!');
        // TODO: Fallback to getMovieByTitleAPI
        resolve();
      }
    })
    .catch(error => {
      Logger.consoleLog('getExactMovie error:', error);
      reject(error);
    });
  });
};

const getFuzzyMovie = (title) => {
  Logger.consoleLog('getFuzzyMovie');
  return new Promise((resolve, reject) => {
    getMovieByTitleFuzzySearchDB(title, 5)
    .then(movie => {
      Logger.consoleLog('getMovieByTitleFuzzySearchDB: ', movie?.title);
      if (movie) {
        resolve(movie);
      } else {
        Logger.consoleLog('oops!');
        // TODO: Fallback to getMovieByTitleFuzzySearchDBAPI
        resolve();
      }
    })
    .catch(error => {
      Logger.consoleLog('getMovieByTitleFuzzySearchDB error:', error);
      reject(error);
    });
  });
};

model.getFuzzySearch = (title) => {
    Logger.consoleLog('FuzzySearch Model');
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getFuzzySearch title: ', title);
      Logger.consoleLog('getFuzzySearch title length: ', title?.length);

      if (!title || title.length === 0) {
        Logger.consoleLog('getFuzzySearch Returning empty array');
        resolve([]);
      } else {
        getMovie(title)
        .then(movie => {
          if (movie && movie.title) {
            Logger.consoleLog('Movie found:', movie?.title);
            relatedModel.getRelatedMovies(movie, 9)
            .then(movies => {
              movies.unshift(movie);
              resolve(movies);
            })
          } else {
            Logger.consoleLog('getFuzzySearch: No movie found!', movie);
            resolve([]);
          }
        })
        .catch(error => {
          Logger.consoleLog('getFuzzySearch error:', error);
          reject(error);
        });
      }
    });
  };

module.exports.model = model;