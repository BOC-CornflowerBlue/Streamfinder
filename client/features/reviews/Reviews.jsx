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
        username: username || 'user-test-1',
        reviews: reviews
      }, () => this.isReviewedByUser());
    }
  }

  isReviewedByUser() {
    const { username, reviews } = this.state;
    if (reviews.length > 0 && username) {
      reviews.forEach(review => {
        if (username === review.username) {
          this.setState({
            reviewedByUser: false,
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
    }).then((response) => {
      // display confirmation message
      this.setState({ reviewedByUser: true });
    }).catch((err) => {

    });
  }

  render() {
    const { reviewedByUser, userReview, reviews, userStarRating } = this.state;
    let reviewCards = [];
    if (reviews.length > 0 ) {
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
          reviewCards
          :
          <div>
            <form>
              <input type='textarea' name='userReview' onChange={this.handleChange} />
              <button onClick={this.submitReview}>
                SUBMIT REVIEW
              </button>
            </form>
            reviewCards
          </div>
        }
      </div>

    );
  }
}

export default Reviews;