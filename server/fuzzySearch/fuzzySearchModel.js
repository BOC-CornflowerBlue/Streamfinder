const { Logger } = require('../../logger.js');
const {
  getMovieByTitle: getMovieByTitleDB,
  getMovieByTitleFuzzySearch: getMovieByTitleFuzzySearchDB
} = require('../database/databaseController.js');
const { getMovieByTitle: getMovieByTitleAPI } = require('../api/apiController.js');

const confidenceScoreLimit = 3;
const resultsLimit = 11;
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
        });
      }
    })
    // getFuzzyMovie(title)
    // .then(fuzzyMovie => {
    //   if (fuzzyMovie && fuzzyMovie.length > 0) {
    //     resolve(fuzzyMovie);
    //   } else {
    //     Logger.consoleLog('getMovie: No movie found!');
    //     resolve([]);
    //   }
    // })
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
        Logger.consoleLog('Movie failed to be found in DB. Checking 3rd party API...');
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
    getMovieByTitleFuzzySearchDB(title, confidenceScoreLimit)
    .then(movies => {
      if (movies?.length > 0) {
        const movie = movies[0];
        Logger.consoleLog('getMovieByTitleFuzzySearchDB: ', movie?.title);
        resolve(movie);
      } else {
        Logger.consoleLog('Movie failed to be found in DB. Checking 3rd party API...');
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
    Logger.consoleLog('Title Words: ', titleWords);

    for (let i = 0; i < titleWords.length - 1; i++) {
      const titleVariationsList = Array.from(titleVariations);
      Logger.consoleLog('titleVariationsList: ', titleVariationsList);
      Logger.consoleLog('last titleVariation: ', titleVariationsList[titleVariationsList.length - 1]);
      Logger.consoleLog('Variation to be trimmed: ', titleVariationsList[titleVariationsList.length - 1]);
      let nextVariation = removeLastWord(titleVariationsList[titleVariationsList.length - 1]);
      Logger.consoleLog('nextVariation: ', nextVariation);

      // Avoid repeats & irrelevant words trailing in phrase variations like: and, the, to, of, in, a
      let lastWord = getLastWord(nextVariation);
      Logger.consoleLog('last word: ', lastWord);
      while (titleVariations.has(nextVariation)
      || (0 < lastWord.length && lastWord.length <= 3)) {
        Logger.consoleLog('last word: ', lastWord);
        nextVariation = removeLastWord(nextVariation);
        lastWord = getLastWord(nextVariation);
      }

      if (nextVariation.length > 0) {
        Logger.consoleLog('Adding title variation: ', nextVariation);
        titleVariations.add(nextVariation);
        Logger.consoleLog('titleVariations: ', titleVariations);
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

  Logger.consoleLog('getMoviesWithSimilarTitles');
  const titleVariations = getTitleVariations(title);
  Logger.consoleLog('Title variations: ', titleVariations);

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
            Logger.consoleLog('Adding movie: ', movie.title);
            movieTitles.add(movie.title);
            movies.push(movie);
          }
        })
      })
      Logger.consoleLog('getMoviesWithSimilarTitles: ', movies[0]?.title);
      Logger.consoleLog('Length: ', movies.length);
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
    Logger.consoleLog('FuzzySearch Model');
    return new Promise((resolve, reject) => {
      const moviesResults = [];
      Logger.consoleLog('getFuzzySearch title: ', title);
      Logger.consoleLog('getFuzzySearch title length: ', title?.length);

      if (!title || typeof title !== 'string' || title.length === 0) {
        Logger.consoleLog('getFuzzySearch Returning empty array');
        resolve(moviesResults);
      } else {
        getMovie(title)
        .then(movie => {
          if (movie && movie.title) {
            Logger.consoleLog('Movie found:', movie[0]?.title);
            getMoviesWithSimilarTitles(movie.title, 9)
            .then(movies => {
              // Add closest matching movie to the front of the list
              movies.unshift(movie);
              resolve(movies);
            })
          } else {
            Logger.consoleLog('getFuzzySearch: No movie found!', movie);
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