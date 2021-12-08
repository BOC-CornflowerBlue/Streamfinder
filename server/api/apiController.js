const axios = require('axios');
const API_KEY = process.env.API_KEY;
const { Logger } = require('../../logger.js');
const { extractVideo, extractVideos } = require('./apiHelpers.js');

const getProvider = (movieId) => {
  return new Promise((resolve, reject) => {
    Logger.consoleLog(movieId);
    const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`;

    axios.get(url)
    .then(({data}) => {
      const results = data.results.US;
      resolve(results);
    })
    .catch(error => {
      Logger.consoleLog('getProvider url: ', url);
      Logger.consoleLog('getProvider error: ', error);
      reject(error);
    });
  });
};

// Gets list of providers associated with the movies based on movie ID
const getProviders = (movieIds) => {
  return new Promise((resolve, reject) => {
    const providers = [];
    movieIds.forEach((movieId) => {
      providers.push(getProvider(movieId));
    });

    Promise.all(providers)
    .then(results => {
      resolve(results);
    })
    .catch(error => {
      Logger.consoleLog('getProviders error: ', error);
      reject(error);
    });
  });
};

module.exports = {
  // Gets movie data by movie name at the 3rd party API source
  // https://developers.themoviedb.org/3/search/search-movies
  getMovieByTitle: (title) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog(title);
      const nameURI = encodeURI(title);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${nameURI}&page=1&include_adult=false`;

      axios.get(url)
      .then(({data}) => {
        const results = data.results;
        // Logger.consoleLog('results: ', results);
        if (results.length === 0) {
          Logger.consoleLog('getMovie error: No movie found');
          reject();
        } else {
          let videos = extractVideo(results[0]);
          resolve(videos);
        }
      })
      .catch(error => {
        Logger.consoleLog('getMovie url: ', url);
        Logger.consoleLog('getMovie error: ', error);
        reject(error);
      });
    });
  },

  // Gets recommended movie based on movie ID at 3rd party API source
  // https://developers.themoviedb.org/3/movies/get-movie-recommendations
  getRecommendations: (movieId) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog(movieId);
      const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`;

      axios.get(url)
      .then(({data}) => {
        let videos = extractVideos(data);
        resolve(videos);
      })
      .catch(error => {
        Logger.consoleLog('getRecommendations url: ', url);
        Logger.consoleLog('getRecommendations error: ', error);
        reject(error);
      });
    });
  },

  // Gets similar movie based on movie ID at 3rd party API source
  // These items are assembled by looking at keywords and genres.
  // https://developers.themoviedb.org/3/movies/get-similar-movies
  getSimilar:  (movieId) => {
    return new Promise((resolve, reject) => {
      Logger.consoleLog(movieId);
      const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;

      axios.get(url)
      .then(({data}) => {
        let videos = extractVideos(data);
        resolve(videos);
      })
      .catch(error => {
        Logger.consoleLog('getSimilar url: ', url);
        Logger.consoleLog('getSimilar error: ', error);
        reject(error);
      });
    });
  },

  // Gets movies trending at the 3rd party API source
  // https://developers.themoviedb.org/3/movies/get-popular-movies
  getTrending: () => {
    return new Promise((resolve, reject) => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      axios.get(url)
      .then(({data}) => {
        let videos = extractVideos(data);
        resolve(videos);
      })
      .catch(error => {
        Logger.consoleLog('getTrending url: ', url);
        Logger.consoleLog('getTrending error: ', error);
        reject(error);
      });
    });
  },

  getProvider,
  getProviders
};