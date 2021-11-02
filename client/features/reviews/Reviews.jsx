import React from 'react';
import '../sharedComponents/StarRatingInteractive.jsx';
import './Reviews.css';
import './ReviewCard.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewedByUser: null,
      userReview: '',
      userStarRating: null,
      reviews: []
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    const { userId, mediaId } = this.props;
    axios.get('/get-review', {
      params: {
        userId,
        mediaId
      }
    }).then((response) => {
      const { reviewedByUser, userReview, reviews } = response;
      if (reviewedByUser) {
        this.setState({
          reviewedByUser,
          userReview,
          reviews
        });
      } else {
        this.setState({reviewedByUser: false });
      }
    }).catch((err) => {
      // do something
    });
  }

  handleClick(e) {

  }

  handleChange(e) {
    this.setState({ userReview: e.target.value });
  }

  handleSubmit() {
    const { mediaId, userId } = this.props;
    axios.post('/submit-review', {
      mediaId: mediaId,
      userId: userId,
      userReview: this.state.userReview
    }).then((response) => {
      // display confirmation message
      this.setState({ reviewedByUser: true });
    }).catch((err) => {

    });
  }

  render() {
    const { reviewedByUser, userReview, reviews, userStarRating } = this.state;
    if (reviews.length > 0 ) {
      reviews.forEach((review, i) => {
        return <ReviewCard
          key={i}
          userId={review.userId}
          username={review.username}
          starRating={review.starRating}
          userReview={review.userReview}
        />;
      });
    }
    return (
      <div id="reviews">
        <h1>Reviews</h1>

        {reviewedByUser ?
          <ReviewCard key={reviews.length + 2} username={this.props.username} starRating={userStarRating} userReview={userReview}/>
          :
          <form>
            <input type='textarea' name='userReview' onChange={this.handleChange} />
            <input type="submit" value="SUBMIT REVIEW" />
          </form>
        }
      </div>

    );
  }
}

export default Reviews;