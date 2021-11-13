import React from 'react';
import StarRating from './StarRating';

class StarRatingInteractive extends React.Component {
  constructor(props) {
    super(props);

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      rating: 0,
      preview: 0
    };
  }

  handleRatingChange(e) {
    this.setState({
      rating: e.currentTarget.name
    }, () => {
      const { setStarRatingInReviews } = this.props;
      if (setStarRatingInReviews) {
        setStarRatingInReviews(this.state.rating);
      }
    });
  }

  handleHover(e) {
    const { preview } = this.state;
    const hover = e.currentTarget.name;
    if (preview === hover) { return; }

    this.setState({
      preview: hover
    });
  }

  handleBlur(e) {
    this.setState({ preview: 0 });
  }

  render() {
    const { rating, preview } = this.state;

    return (
      <div id="StarRatingInteractive" className="container" onMouseLeave={ this.handleBlur }>
        <StarRating avgRating={ preview || rating } interaction={{ preview: this.handleHover, select: this.handleRatingChange }} />
      </div>
    );
  }
}

export default StarRatingInteractive;
