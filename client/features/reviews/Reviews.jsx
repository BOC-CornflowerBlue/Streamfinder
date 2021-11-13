import React from 'react';
import axios from 'axios';
import '../sharedComponents/StarRatingInteractive.jsx';
import './Reviews.css';
import ReviewCard from './ReviewCard.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaId: null,
      username: null,
      reviewedByUser: null,
      userReview: '',
      userStarRating: null,
      reviews: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { mediaId, username, reviews } = this.props;
    if (this.state.mediaId !== mediaId) {
      this.setState({
        mediaId: mediaId,
        username: username || 'user-test-13',
        reviews: reviews
      }, () => this.isReviewedByUser());
    }
  }

  isReviewedByUser() {
    const { username, reviews } = this.state;
    if (username && reviews && reviews.length) {
      reviews.forEach(review => {
        if (username === review.username) {
          this.setState({
            reviewedByUser: true,
            userReview: review.content
          });
        }
      });
    }
  }

  handleChange(e) {
    this.setState({ userReview: e.target.value });
  }

  submitReview(e) {
    e.preventDefault();
    const { mediaId, username, userReview } = this.state;
    axios.post('/reviews/submit-review', {
      mediaId: mediaId,
      username: username,
      userReview: userReview
    }).then((updatedMovieReviews) => {
      this.setState({
        reviewedByUser: true,
        reviews: updatedMovieReviews.data
      });
    }).catch((err) => {
      console.log('AXIOS ERROR: SUBMIT REVIEW: ', err);
    });
  }

  render() {
    const { reviewedByUser, userReview, reviews, userStarRating } = this.state;
    let reviewCards = [<ReviewCard key={0} content={'No reviews yet!'} />];
    if (Array.isArray(reviews)) {
      console.log('REVIEWS.LENGTH GREATHER THAN 0');
      reviewCards = reviews.map((review, i) => {
        return <ReviewCard
          key={i}
          username={review.username}
          content={review.content}
          rating={review.rating}
        />;
      });
    }

    return (
      <div id="reviews">
        <h1>Reviews!</h1>
        {reviewedByUser ?
          <>{reviewCards}</>
          :
          <div>
            <form>
              <input type='textarea' name='userReview' onChange={this.handleChange} />
              <button onClick={this.submitReview}>
                SUBMIT REVIEW
              </button>
            </form>
            <>{reviewCards}</>
          </div>
        }
      </div>

    );
  }
}

export default Reviews;