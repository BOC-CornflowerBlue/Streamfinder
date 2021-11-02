const {Movie} = require('../database/database.js');
const redisClient = require('../cacheManager')
// console.log(redisClient)
module.exports = {
  getMovie:  (movieName) => {
    //this is scuffed
    let cache = redisClient.getAsync('Iron Man 2').then((data) => Promise.resolve(data))
    return new Promise((resolve, reject) => {
      cache.then((data) => {
        if (data === null) {
          //we need to request from api
          //for now we just query the string

          //replace below with API functionality
          Movie.find({title: 'Iron Man 2'})
            .then((data) => {
              resolve(data)
            })
          //replace
        } else {
          //used id returned from cache to find data from db
        }
      })
    }).then((d) => {
    return d
    })
  }
}