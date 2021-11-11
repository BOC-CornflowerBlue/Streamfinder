const { Movie, Review } = require('../database/database.js');

module.exports = {
  submitUserReview: (mediaId, username, userReview) => {
    return new Promise((resolve, reject) => {
      Review.create({ username: username, content: userReview })
        .then((review) => {
          const movie = { id: mediaId };
          const addReview = { $push: { reviews: review } };
          const returnUpdatedDoc = { new: true };
          Movie.findOneAndUpdate(movie, addReview, returnUpdatedDoc)
            .then(updatedMovie => {
              console.log('DATABASE: UPDATED MOVIE REVIEWS ======= ', updatedMovie.reviews);
              resolve(updatedMovie.reviews); });
        });
    });
  }
};