const { Logger } = require('../../logger.js');

module.exports = {
  transformToSearchDisplay: (movieResults) => {
    if (!movieResults.history) {
      return [];
    }

    const movieSearchResults = movieResults.history.map((movie) => {
      // Logger.consoleLog(movie);
      return {
        title: movie.title,
        imgUrl: movie.imgUrl,
        providers: [
          // TODO: Does null not appear in the array? Or does the array end up with null placeholders? Is this a problem?
          movie.hulu ? movie.hulu : null,
          movie.disney ? movie.disney : null,
          movie.netflix ? movie.netflix : null,
          movie.hbo ? movie.hbo : null,
          movie.apple ? movie.apple : null,
          movie.amazon ? movie.amazon : null
        ]
      };
      // TODOL: rating: -> whereabouts unknown
    });
    Logger.consoleLog('movieSearchResults:', movieSearchResults);
    return movieSearchResults;
  },
  getUniqueIds: (searchedMovie, trendingMovies, suggestedMovies) => {
    const searchedMovieId = searchedMovie.id;
    const trendingMovieIds = trendingMovies.map((tendingMovie) => tendingMovie.id);
    const suggestedMovieIds = suggestedMovies.map((suggestedMovie) => suggestedMovie.id);

    const movieIds = trendingMovieIds.concat(suggestedMovieIds);
    movieIds.push(searchedMovieId);
    return [...new Set(movieIds)];
  },
  getFlatRateProviders: (providersByMovieRaw) => {
    let flatRateProviders = providersByMovieRaw.map((providersForMovieRaw) => {
      const providersForMovie = {};
      if (providersForMovieRaw !== undefined) {
        // Logger.consoleLog('providersForMovieRaw: ', providersForMovieRaw);
        // Logger.consoleLog('providersForMovieRaw.link: ', providersForMovieRaw.link);
        let movieIdString = providersForMovieRaw.link.split('-')[0].split('movie/')[1];
        providersForMovie.movieId = Number(movieIdString);
        if (providersForMovieRaw.flatrate !== undefined) {
          providersForMovie.logoPaths = [];
          providersForMovie.providers = [];
          // Logger.consoleLog('providersForMovieRaw.flatrate:', providersForMovieRaw.flatrate);
          providersForMovieRaw.flatrate.forEach((flatrateProvider) => {
            providersForMovie.providers.push(flatrateProvider.provider_name);
            providersForMovie.logoPaths.push(`https://www.themoviedb.org/t/p/w1280${flatrateProvider.logo_path}`);
          });
        }
      }
      // Logger.consoleLog('providersForMovie:', providersForMovie);
      return providersForMovie;
    });

    // Logger.consoleLog('flatRateProviders:', flatRateProviders);
    return flatRateProviders.filter((providersForMovie) => {
      if (Object.keys(providersForMovie).length) {
        return providersForMovie;
      }
    });
  },
  getMovieWithProviders: (searchedMovie, providersByMovie) => {
    // Logger.consoleLog('searchedMovie:', searchedMovie);
    // Logger.consoleLog('providersByMovie:', providersByMovie);
    const movieWithProviders = Object.assign({}, searchedMovie);

    for (let i = 0; i < providersByMovie.length; i++) {
      const movieProviders = providersByMovie[i];
      if (movieProviders.movieId === searchedMovie.id) {
        for (let j = 0; j < movieProviders.length; j++) {
          const provider = movieProviders[j];
          if (provider.toLowerCase().includes('disney')) { // TODO: Why are we only doing this for disney?
            movieWithProviders.disney = movieProviders.logo_paths[i];
            break;
          }
        }
      }
    }

    // Logger.consoleLog('movieWithProviders:', movieWithProviders);
    return movieWithProviders;
  },
  addProvidersToMovies: (movies, finalProviders) => {
    const getProviderPropertyName = (currentService) => {
      if (currentService === 'Hulu') {
        return 'hulu';
      } else if (currentService === 'Disney Plus') {
        return 'disney';
      } else if (currentService === 'Netflix') {
        return 'netflix';
      } else if (currentService === 'HBO Max') {
        return 'hbo';
      } else if (currentService === 'Apple TV Plus') {
        return 'apple';
      } else if (currentService === 'Amazon Prime Video') {
        return 'amazon';
      }
    };

    // TODO: This is needlessly O(N^2). Can remove if movie providers stores by movie ID as key
    movies.forEach((movie) => {
      finalProviders.forEach((movieProvider) => {
        if (movieProvider.id === movie.id && movieProvider.providers) {
          for (let i = 0; i < movieProvider.providers.length; i++) {
            const currentService = movieProvider.providers[i];
            let providerPropertyName = getProviderPropertyName(currentService);

            movie[providerPropertyName] = movieProvider.logoPaths[i];
          }
        }
      });
    });
    return movies;
  }
};