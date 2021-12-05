const { Logger } = require('../../logger.js');
const { getMovieByTitle: getMovieByTitleDB } = require('../database/databaseController.js');
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
        // getMovieByTitleAPI
        resolve();
      }
    })
    .catch(error => {
      Logger.consoleLog('getExactMovie error:', error);
      reject(error);
    })
  });
};

// 2. Entering a movie title which is misspelled.
// get partial match -> find movie with assumed correct spelling
const getFuzzyMovie = (title) => {
  Logger.consoleLog('getFuzzyMovie');
  return new Promise((resolve, reject) => {
    resolve();
        // DB
        // API
  });
};

model.getFuzzySearch = (title) => {
    Logger.consoleLog('FuzzySearch Model');
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getFuzzySearch title: ', title);

      if (!title || title.length === 0) {
        resolve([]);
      }

      getMovie(title)
      .then(movie => {
        if (movie && movie.title) {
          Logger.consoleLog('Movie found:', movie);
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
      })
    });
  };

module.exports.model = model;