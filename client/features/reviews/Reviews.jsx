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
      }, () => { this.isReviewedByUser(); });
    }
  }

  isReviewedByUser() {
    const { username, reviews } = this.state;
    if (reviews.length > 0 && username) {
      reviews.forEach(review => {
        if (username === review.username) {
          this.setState({
            reviewedByUser: true,
            userReview: review.content
          });
        } else {
          this.setState({
            reviewedByUser: false,
            userReview: ''
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
    const { username, reviewedByUser, userReview, reviews, userStarRating } = this.state;
    let reviewCards;
    if (reviews.length > 0 ) {

      reviewCards = [];

      reviews.forEach((review, i) => {

        if (reviewedByUser && username === review.username) {
          reviewCards.unshift(
            <ReviewCard
              key={i}
              username={review.username}
              content={review.content}
              rating={review.rating}
              thisUsersReview={true}
            />
          );
        } else {
          reviewCards.push(
            <ReviewCard
              key={i}
              username={review.username}
              content={review.content}
              rating={review.rating}
              thisUsersReview={false}
            />
          );
        }
      });
    }

    return (
      <div id="reviews">
        <h1>Reviews!</h1>
        {!reviewedByUser ?
          <div>
            <form>
              <input type='textarea' name='userReview' onChange={this.handleChange} />
              <button onClick={this.submitReview}>
                SUBMIT REVIEW
              </button>
            </form>
          </div>
          :
          ''
        }

        {reviewCards ? <>{reviewCards}</> : <>'Be the first to write a review!'</>}

      </div>
    );
  }
}

export default Reviews;