const axios = require('axios');
const { Logger } = require('../../logger.js');
const API_KEY = process.env.API_KEY;

module.exports = {
  // Gets movie data by movie name at the 3rd party API source
  getMovie: (movieName) => {
    // TODO: This seems to just be getting movies by name rather than any history
    const name = movieName.replace(' ', '%20'); // TODO: URI encode rather than doing this
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;

    return axios.get(url)
      .then(({data}) => {
        const { id, title, overview, poster_path, vote_average, vote_count } = data.results[0];
        const imgUrl = `https://www.themoviedb.org/t/p/w1280${poster_path}`;
        return {
          id,
          mediaType: 'Movie',
          title,
          rating: vote_average,
          ratingCount: vote_count,
          summary: overview,
          imgUrl: imgUrl,
          hulu: null,
          disney: null,
          netflix: null,
          hbo: null,
          apple: null,
          amazon: null
        };
      });
      // TODO: No error handling
  },
  // Gets movies trending at the 3rd party API source
  getTrending: () => {
    // TODO: This is only returning the first 5 results. It should be able to be tweaked to get results in sets of 5 instead.
    // Front end state can track which set of 5 to get based on carousel position. Talk w/ Steve & Taniel.
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    return axios.get(url)
      .then(({data}) => {
        let firstFiveVideos = data.results.map((result, i) => {
          if (i <= 4) {
            return {
              id: result.id,
              mediaType: 'Movie',
              title: result.title,
              rating: result.vote_average,
              ratingCount: result.vote_count,
              summary: result.overview,
              imgUrl: `https://www.themoviedb.org/t/p/w1280${result.poster_path}`,
              hulu: null,
              disney: null,
              netflix: null,
              hbo: null,
              apple: null,
              amazon: null
            };
          }
        });
        // TODO: No error handling
        firstFiveVideos = firstFiveVideos.filter((video) => { if (video !== undefined) { return video; } });
        return firstFiveVideos;
      });
  },
  // Gets suggested movie based on movie ID at 3rd party API source
  getSuggested: (movieId) => {
    // TODO: This is only returning the first 5 results. It should be able to be tweaked to get results in sets of 5 instead.
    // Front end state can track which set of 5 to get based on carousel position. Talk w/ Steve & Taniel.
    Logger.consoleLog(movieId);
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`;

    return axios.get(url)
      .then(({data}) => {
        let firstFiveVideos = data.results.map((result, i) => {
          if (i <= 4) {
            return {
              id: result.id,
              mediaType: 'Movie',
              title: result.title,
              summary: result.overview,
              rating: result.vote_average,
              ratingCount: result.vote_count,
              imgUrl: `https://www.themoviedb.org/t/p/w1280${result.backdrop_path}`,
              hulu: null,
              disney: null,
              netflix: null,
              hbo: null,
              apple: null,
              amazon: null
            };
          }
        });
        firstFiveVideos = firstFiveVideos.filter((video) => { if (video !== undefined) { return video; } });
        return firstFiveVideos;
      });
      // TODO: No error handling

  },
  // Gets list of providers associated with the movie based on movie ID
  getProviders: (movieIds) => {
    // TODO: Promise.All is handled strangely. Refactor later to be of more standard form
    const providersByMovie = [];

    const providers = new Promise((resolve, reject) => {
      movieIds.forEach((movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`;

        axios.get(url)
        .then(({data}) => {
          const results = data.results.US;
          providersByMovie.push(results);

          if (providersByMovie.length === movieIds.length) {
            return providersByMovie;
          }
        })
        .then((providersByMovie) => {
          if (providersByMovie !== undefined) {
            // Logger.consoleLog(data);
            resolve(providersByMovie);
          }
        })
        // TODO: There is no error handling for this promise
      })
    });

    providers.then((providerData) => {
      return(providerData);
    })
    return providers;
    // TODO: No error handling
  }
};