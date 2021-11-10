const {Movie, User, TempUser} = require('../database/database.js');
const redisClient = require('../cacheManager');
const {transformToSearchDisplay, getUniqueIds, finalProviderData, createFinalMovieObj, createFinalArrays} = require('./searchHelpers');
const {transformHistoryResponse, transformSuggestedResponse} = require('../home/movieHelpers');
const {getHistory, getTrending, getSuggested, getProviders} = require('./APIController');
module.exports = {
  getMovie: (searchInputTitle, user) => {
    //we need to check cache to see if title is there
    //this is scuffed
    //because cache is not set up yet to based on auth.  A sample insert is made
    //after sample is set ---- comment out
    // let sampleKey = 'Iron Man 2'
    // let sampleValue = '10138'
    // let sample = redis.set(sampleKey, sampleValue)
    // console.log(sample)
    return new Promise((resolve, reject) => {
      redisClient.get(searchInputTitle, (err, id) => {
        if (id !== null) {
          Movie.find({id: id}).then((movieData) => {
            //lets configure that movie data for search page display
            const finalSearch = transformToSearchDisplay(movieData[0]);
            //send it
            resolve(finalSearch);
          });
        } else {
          //create getHistory - search movies with name (this will be history)
          getHistory(searchInputTitle).then((history) => {
            //create historyArr - which holds all the data related to the history view
            const movieId = history.id;
            //create getTrending - use searched movie response id to get trending (movie get popular api request)
            getTrending().then((trending) => {
              //create trendingArr which holds data related to trending view
              //create getSuggested - use searched movie response id to get suggested (movie get recommendations api request)
              getSuggested(movieId).then((suggested) => {
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
                        if (err) {
                          console.log('ERROR in movieSave: ', err);
                        } else {
                          console.log('SUCCESS saving movie');
                        }
                      });
                    };

                    movieSave(finalMovieObj);
                    finalSuggestedArr.unshift(finalMovieObj)
                    let finalResponse = {
                      suggested: finalSuggestedArr

                    };
                    const movieSearchResponse = transformSuggestedResponse(finalResponse);
                    resolve(movieSearchResponse);
                  });
        
                });
              });
            });
          });
        }
      });
    });
  }
};
