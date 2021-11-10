const { Logger } = require('../../logger.js');
const { Movie, User } = require('../database/database.js');
const redisClient = require('../cacheManager');
const {
  transformToSearchDisplay,
  getUniqueIds,
  getFlatRateProviders,
  getMovieWithProviders,
  addProvidersToMovies } = require('./searchHelpers');
const { transformSuggestedResponse } = require('../home/movieHelpers');
const {
  getMovie: getMovieAPI,
  getTrending: getTrendingAPI,
  getSuggested: getSuggestedAPI,
  getProviders: getProvidersAPI } = require('./APIController');

module.exports = {
  getMovie: (movieName, user) => {
    return new Promise((resolve, reject) => {
      // we need to check cache to see if title is there
      // this is scuffed
      // because cache is not set up yet to based on auth.  A sample insert is made
      // after sample is set ---- comment out
      // let sampleKey = 'Iron Man 2'
      // let sampleValue = '10138'
      // let sample = redis.set(sampleKey, sampleValue)
      // Logger.consoleLog(sample)
      redisClient.get(movieName, (err, movieId) => {
        if (movieId !== null) {
          Movie.find({id: movieId}).then((movieData) => {
            Logger.consoleLog('Found movie:', movieData[0]);
            const finalSearch = transformToSearchDisplay(movieData[0]);
            resolve(finalSearch);
          });
        } else {
<<<<<<< HEAD
          getMovieAPI(movieName).then((searchedMovie) => {
            movieId = searchedMovie.id;

            // TODO: getTrending has no relation to searched movie
            // TODO: Below could be done as a Promise.All instead of nested .then
            getTrendingAPI().then((trendingMovies) => {
              getSuggestedAPI(movieId).then((suggestedMovies) => {
                const uniqueMovieIds = getUniqueIds(searchedMovie, trendingMovies, suggestedMovies);
                // TODO: Below is the result of Promise.All from above
                getProvidersAPI(uniqueMovieIds)
                .then((providersByMovie) => {
                  const flatRateProvidersByMovie = getFlatRateProviders(providersByMovie);
                  // Logger.consoleLog('finalProviders: ', flatRateProvidersByMovie);

                  const movieWithProviders = getMovieWithProviders(searchedMovie, flatRateProvidersByMovie);

                  movieWithProviders.trending = addProvidersToMovies(trendingMovies, flatRateProvidersByMovie);
                  movieWithProviders.suggested = addProvidersToMovies(suggestedMovies, flatRateProvidersByMovie);

                  const saveMovieToDB = (movie) => {
                    let filter = { id: movie.id };

                    let update = {
                      suggested,
                      trending,
                      mediaType,
                      title,
                      rating,
                      ratingCount,
                      summary,
                      imgUrl,
                      hulu,
                      disney,
                      netflix,
                      hbo,
                      apple,
                      amazon
                    } = movie;

                    let options = {
                      new: true,
                      upsert: true
                    };
                    Movie.findOneAndUpdate(filter, update, options, (err, data) => {
                      if (err) {
                        Logger.consoleLog('ERROR in movieSave: ', err);
                      } else {
                        Logger.consoleLog('SUCCESS saving movie: ');//, data);
                      }
=======
          //create getHistory - search movies with name (this will be history)
          getHistory(searchInputTitle).then((history) => {
            //create historyArr - which holds all the data related to the history view
            const id = history.id;
            const historyArr = [history];
            //create getTrending - use searched movie response id to get trending (movie get popular api request)
            getTrending().then((trending) => {
              //create trendingArr which holds data related to trending view
              //create getSuggested - use searched movie response id to get suggested (movie get recommendations api request)
              getSuggested(id).then((suggested) => {
                //create suggestedArr which holds data related to the suggessted view
                //create uniqueMovieIds - pull unique ids from historyArr, trendingArr, and suggestedArr
                const uniqueMovieIds = getUniqueIds(history, trending, suggested);
                //create providers - request providers for each id (with a promise all)
                const providers = getProviders(uniqueMovieIds);
                providers.then((data) => {
                  const finalProviders = finalProviderData(data); //<----here jaimie
                  console.log('finalProviders: ', finalProviders);

                  //create finalMovieObj - adds providers to the history obj,  providers based on movies id
                  const finalMovieObj = createFinalMovieObj(history, finalProviders);

                  //replace with real user function once running
                  const checkAndUpdate = User.find({username: user}).then((userData) => {
                    // console.log(userData)
                    if (userData[0].history.length) {
                      userData[0].history.forEach((historyObj) => {
                        if (historyObj[0].title.toLowerCase() !== finalMovieObj.title.toLowerCase()) {
                          User.updateOne({username: user, $push: {history: finalMovieObj}, currentId: finalMovieObj.id}, (err, data) => {
                            console.log('saved new record: User History');
                          });
                        } else {
                          console.log('record exists already yooo');
                        }
                      });

                    } else if (!userData[0].history.length) {

                      User.updateOne({username: user, $push: {history: finalMovieObj}}, (err, data) => {
                        console.log('saved new record: MovieSchema');
                      });
                    }
                    return true;

                  });
                  checkAndUpdate.then((bool) => {

                    //create finalHistoryArr - adds providers to the movies in historyArr, providers based on movies id

                    const finalHistory = User.find({username: user}, (err, data) => {
    
                      //create finalTrendingArr - adds providers to the movies in trendingArr, providers based on movies id
                      const finalTrendingArr = createFinalArrays(trending, finalProviders);
                      finalMovieObj.trending = finalTrendingArr;
                      //create finalSuggestedArr - adds providers to the movies in suggestedArr, providers based on movies id
                      const finalSuggestedArr = createFinalArrays(suggested, finalProviders);
                      finalMovieObj.suggested = finalSuggestedArr;
                      //createDbObj - adds finalHistoryArr, finalTrendingArr, and finalSuggestedArr to finalMovieObj
                      //create movieSave - saves new movie data to schema
                      const movieSave = (movieObj) => {
                        let filter = {id: movieObj.id};
                        let update = {
                          suggested: movieObj.suggested,
                          trending: movieObj.trending,
                          mediaType: movieObj.mediaType,
                          title: movieObj.title,
                          rating: movieObj.rating,
                          ratingCount: movieObj.ratingCount,
                          summary: movieObj.summary,
                          imgUrl: movieObj.imgUrl,
                          hulu: movieObj.hulu,
                          disney: movieObj.disney,
                          netflix: movieObj.netflix,
                          hbo: movieObj.hbo,
                          apple: movieObj.apple,
                          amazon: movieObj.amazon
                        };
                        let options = {
                          new: true,
                          upsert: true
                        };
                        Movie.findOneAndUpdate(filter, update, options, (err, data) => {
                          // if (err) {
                          //   console.log('ERROR in movieSave: ', err);
                          // } else {
                          //   console.log('SUCCESS saving movie: ', data);
                          // }
                        });
                      };


                      // temp.push(history)


                      movieSave(finalMovieObj);
                      finalSuggestedArr.unshift(finalMovieObj)
                      let finalResponse = {
                        suggested: finalSuggestedArr

                      };

                      const movieSearchResponse = transformSuggestedResponse(finalResponse);
                      // finalMovieObj.history = movieHistoryResponse
                      // console.log(finalMovieObj.history)
                      // console.log(movieSearchResponse, "🚀")
                      resolve(movieSearchResponse);
>>>>>>> 8eb40ec (adds tile display to home/search, fixes app crashing upon switching to home, search now displays the item searched + suggested)
                    });
                  };

                  saveMovieToDB(movieWithProviders);
                  const movieSearchResponse = transformSuggestedResponse({ suggested: movieWithProviders.suggested });
                  Logger.consoleLog('movieSearchResponse:', movieSearchResponse, '🚀');

                  // TODO: Let this run, but on later PR switch to next section for 'resolve'
                  resolve(movieSearchResponse);

                  // TODO: save (key) name and (value) id to redis
                  // TODO: Exit as below instead of resolve(movieSearchResponse) above?
                  // const finalSearch = transformToSearchDisplay(movieSearchResponse);
                  // resolve(finalSearch);
                });
              });
            });
          });
        }
      });
    });
  }
};