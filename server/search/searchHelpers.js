module.exports = {
  transformToSearchDisplay: (movieObj) => {
    const finalSearchResponse = movieObj.history.map((movie) => {
      const finalObj = {};
      // console.log(movie)

      finalObj.title = movie.title;
      finalObj.imgUrl = movie.imgUrl;
      finalObj.providers = [movie.hulu ? movie.hulu : null, movie.disney ? movie.disney : null, movie.netflix ? movie.netflix : null, movie.hbo ? movie.hbo : null, movie.apple ? movie.apple : null, movie.amazon ? movie.amazon : null];
      return finalObj;
    });
    return finalSearchResponse;
  },
  getUniqueIds: (historyObj, trendingArr, suggestedArr) => {
    const uniqueHId = historyObj.id;
    const uniqueTId = trendingArr.map((obj) => obj.id);
    const uniqueSid = suggestedArr.map((obj) => obj.id);

    const combined = uniqueTId.concat(uniqueSid);
    combined.push(uniqueHId);
    return [...new Set(combined)];
  },
  finalProviderData: (data) => {
    let finalProviderData = data.map((obj) => {
      const newObj = {};
      let finalProviders = [];
      if (obj !== undefined) {
        let split = obj.link.split('-');
        split = split[0].split('movie/');
        const id = Number(split[1]);
        let logoPaths = [];
        let providers = [];


        newObj.id = id;
        if (obj.flatrate !== undefined) {
          obj.flatrate.forEach((flatObj) => {
            providers.push(flatObj.provider_name);
            logoPaths.push(`https://www.themoviedb.org/t/p/w1280${flatObj.logo_path}`);
          });
          newObj.logo_paths = logoPaths;
          newObj.providers = providers;
        }
        finalProviders.push(newObj);
      }
      return newObj;
    });
    finalProviderData = finalProviderData.filter((obj) => {
      if (Object.keys(obj).length) {
        return obj;
      }
    });
    return finalProviderData;
  },
  createFinalMovieObj: (movieObj, providersArr) => {
    // console.log(movieObj)
    const finalObj = Object.assign({}, movieObj);

    providersArr.forEach((providerObj) => {
      if (providerObj.id === movieObj.id) {
        providerObj.providers.forEach((provider, i) => {
          if (provider.toLowerCase().includes('disney')) {
            finalObj.disney = providerObj.logo_paths[i];
          }

        });
      }
    });
    return finalObj;

  },
  createFinalArrays: (trendingOrSuggestedArr, finalProviders) => {
    trendingOrSuggestedArr.forEach((movie) => {
      let movieId = movie.id;
      finalProviders.forEach((movieProvider) => {
        if (movieProvider.id === movieId && movieProvider.providers) {
          for (let i = 0; i < movieProvider.providers.length; i++) {
            let currentService = movieProvider.providers[i];
            let currentLogo = movieProvider.logo_paths[i];
            if (currentService === 'Hulu') {
              movie.hulu = currentLogo;
            } else if (currentService === 'Disney Plus') {
              movie.disney = currentLogo;
            } else if (currentService === 'Netflix') {
              movie.netflix = currentLogo;
            } else if (currentService === 'HBO Max') {
              movie.hbo = currentLogo;
            } else if (currentService === 'Apple TV Plus') {
              movie.apple = currentLogo;
            } else if (currentService === 'Amazon Prime Video') {
              movie.amazon = currentLogo;
            }
          }
        }
      });
    });
    return trendingOrSuggestedArr;
  }
};