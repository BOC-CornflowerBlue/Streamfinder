const { Movie, Review } = require('../database/database.js');

module.exports = {
  submitUserReview: (mediaId, username, userReview, userStarRating) => {
    return new Promise((resolve, reject) => {
      Review.create({ username: username, content: userReview, rating: userStarRating })
        .then((review) => {
          const movie = { id: mediaId };
          const addReview = { $push: { reviews: review } };
          const returnUpdatedDoc = { new: true };
          Movie.findOneAndUpdate(movie, addReview, returnUpdatedDoc)
            .then(updatedMovie => {
              resolve(updatedMovie.reviews);
            });
        });
    });
  }
};