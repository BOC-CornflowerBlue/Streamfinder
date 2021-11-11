const { Movie, Review } = require('../database/database.js');

module.exports = {
  submitUserReview: (mediaId, username, userReview) => {
    return new Promise((resolve, reject) => {
      Review.create({ username: username, content: userReview })
        .then((review) => {
          const movie = { id: mediaId };
          const addReview = { $push: { reviews: review } };
          console.log('REVIEW ====== ', review);
          Movie.update(movie, addReview)
            .then(result => console.log('RESULT ====== ', result ));
        });
    });
  }
};