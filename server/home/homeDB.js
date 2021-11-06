
const {Movie, User} = require('../database/database.js');
const {transformToHomeResponse, transformHistoryResponse} = require('./movieHelpers')
// console.log(redisClient)
module.exports = {
  getMovie:  (movieId) => {
    //if there is movie id, we know it exists in DB - so lets query it 🔥
    if (movieId) {
      // let cacheContains = redisClient.get(movieId)
      // if (cacheContains) {
      return new Promise((resolve, reject) => {
        Movie.find({id: movieId})
        .then((movieData) => {
          const finalMovie = transformToHomeResponse(movieData[0])
          resolve(finalMovie)
        })
      })
    }
  },
  getHistory: (user) => {

    return new Promise((resolve, reject) => {
      User.find({username:user})
        .then((data) => {
          const response = transformHistoryResponse(data[0])
          resolve(response)
        })
    })
  }
}