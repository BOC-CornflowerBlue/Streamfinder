const { Logger } = require('../../logger.js');
const {
  getMovieByTitle: getMovieByTitleDB,
  getMovieByTitleFuzzySearch: getMovieByTitleFuzzySearchDB
} = require('../database/databaseController.js');
const { getMovieByTitle: getMovieByTitleAPI } = require('../api/apiController.js');

const confidenceScoreLimit = 6;
const resultsLimit = 11;
const model = {};

const getMovies = (title) => {
  return new Promise((resolve, reject) => {
    getExactMovie(title)
    .then(exactMovie => {
      if (exactMovie?.title) {
        resolve([exactMovie]);
      } else {
        getFuzzyMovie(title)
        .then(fuzzyMovies => {
          if (fuzzyMovies?.length > 0) {
            resolve(fuzzyMovies);
          } else {
            resolve([]);
          }
        });
      }
    })
    .catch(error => {
      Logger.consoleLog('getMovie error:', error);
      reject(error);
    })
  });
};

const getExactMovie = (title) => {
  return new Promise((resolve, reject) => {
    getMovieByTitleDB(title)
    .then(movie => {
      if (movie) {
        resolve(movie);
      } else {
        // Logger.consoleLog('Movie failed to be found in DB. Checking 3rd party API...');
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
  return new Promise((resolve, reject) => {
    getMovieByTitleFuzzySearchDB(title, confidenceScoreLimit, resultsLimit)
    .then(movies => {
      if (movies?.length > 0) {
        resolve(movies);
      } else {
        // Logger.consoleLog('Movie failed to be found in DB. Checking 3rd party API...');
        // TODO: Fallback to getMovieByTitleFuzzySearchAPI
        resolve();
      }
    })
    .catch(error => {
      Logger.consoleLog('getMovieByTitleFuzzySearchDB error:', error);
      reject(error);
    });
  });
};

// Returns similar titles, exclusive from the title provided
// This function truncates the title down in meaningful steps, then appends meaningful words at the end
const getMoviesWithSimilarTitles = (title, limit = undefined) => {
  const removeLastWord = (phrase) => {
    const lastIndex = phrase.lastIndexOf(' ');
    return phrase.substring(0, lastIndex);
  };

  const getLastWord = (phrase) => {
    const lastIndex = phrase.lastIndexOf(' ');
    return phrase.substring(lastIndex + 1);
  }

  const getTitleVariations = (title) => {
    const titleVariations = new Set([title]);
    const titleWords = title.split(' ');

    for (let i = 0; i < titleWords.length - 1; i++) {
      const titleVariationsList = Array.from(titleVariations);
      let nextVariation = removeLastWord(titleVariationsList[titleVariationsList.length - 1]);

      // Avoid repeats & irrelevant words trailing in phrase variations like: and, the, to, of, in, a
      let lastWord = getLastWord(nextVariation);
      while (titleVariations.has(nextVariation)
      || (0 < lastWord.length && lastWord.length <= 3)) {
        nextVariation = removeLastWord(nextVariation);
        lastWord = getLastWord(nextVariation);
      }

      if (nextVariation.length > 0) {
        titleVariations.add(nextVariation);
      }
    }

    // Sort titleWords by length, assuming longer length === more relevancy
    const titleWordsByLength = titleWords.sort((a,b) => b.length - a.length);
    titleWordsByLength.forEach(titleWord => {
      if (!titleVariations.has(titleWord)) {
        titleVariations.add(titleWord);
      }
    })

    return Array.from(titleVariations);
  };

  const titleVariations = getTitleVariations(title);

  return new Promise((resolve, reject) => {
    const promises = [];
    titleVariations.forEach(titleVariation => {
      promises.push(getMovieByTitleFuzzySearchDB(titleVariation, confidenceScoreLimit, resultsLimit));
    })

    Promise.all(promises)
    .then(fuzzySearchResults => {
      let movies = [];
      let movieTitles = new Set();
      fuzzySearchResults.forEach(fuzzySearchResult => {
        fuzzySearchResult.forEach(movie => {
          if (!movieTitles.has(movie.title)) {
            movieTitles.add(movie.title);
            movies.push(movie);
          }
        })
      })
      // Avoid returning an exact title match in this function
      if (movies[0]?.title === title) {
        movies.shift();
      }
      if (limit && typeof limit === 'number') {
        resolve(movies.slice(0, limit));
      } else {
        resolve(movies);
      }
    })
    .catch(error => {
      Logger.consoleLog('getMoviesWithSimilarTitles error:', error);
      reject(error);
    });
  });
}

model.getFuzzySearch = (title) => {
    return new Promise((resolve, reject) => {
      const moviesResults = [];

      if (typeof title !== 'string' || title.length === 0) {
        resolve(moviesResults);
      } else {
        getMovies(title)
        .then(movies => {
          if (movies?.length > 0) {
            const title = movies[0].title;
            getMoviesWithSimilarTitles(title, resultsLimit - movies.length - 1)
            .then(moviesFull => {
              resolve(movies.concat(moviesFull));
            })
          } else {
            resolve(moviesResults);
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