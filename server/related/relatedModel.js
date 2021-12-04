const { getSimilar: getSimilarDB } = require('../database/databaseController.js');
const { getSimilar: getSimilarAPI } = require('../api/apiController.js');

const model = {};

// ### Edge Cases
// - User has no watch history
// - User has no existing suggested list (new user, or all history are disliked movies, etc.)

// ### Constraints (Practical, not time/space complexity)
// - Data available from 3rd party API
// - Data saved in server database
// - Current behavior/development of app client components

// For later API calls for this, consider: https://developers.themoviedb.org/3/discover/movie-discover

// https://developers.themoviedb.org/3/movies/get-similar-movies
// GET
// /movie/{movie_id}/similar
// Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.

// These items are assembled by looking at keywords and genres.

// https://developers.themoviedb.org/3/movies/get-movie-recommendations
// GET
// /movie/{movie_id}/recommendations
// Get a list of recommended movies for a movie.

// On Home page load:
// Trending: get popular movies for trending
// if user history is empty:
//    History: do not render history carousel
//    Suggested: get top rated movies: https://developers.themoviedb.org/3/movies/get-top-rated-movies
//
// if user history is not empty:
//    History: Render History carousel
//    Suggested:
//      Begin with current suggested list (if any)
//      Collect the list of movies from history
//      For each movie from history:
//        Get list of suggested movies from IMDB API

//        Get list of related movies from IMDB API
//        Add to overall list of related/suggested movies
//      For each movie in overall list of related/suggested movies:
//        Determine suggestion weight
//      Sort related/suggested movies by weight
//      Limit return by predetermined value (user settings: e.g. 20 movies)

const getSuggestedMovies = (movieId) => {

};


model.getRelatedMovies = (movie, limit = 100) => {
  return new Promise((resolve, reject) => {
    const relatedMovies = [];
    resolve(relatedMovies);
  });
};

module.exports.model = model;