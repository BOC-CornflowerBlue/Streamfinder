import React from 'react';
import StarRating from './../sharedComponents/StarRating.jsx';
import axios from 'axios';

class MediaModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: false,
      rating: 0,
      preview: 0
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onClose(event);
    let userId = this.props.userId || 10138;
    let mediaId = this.props.mediaId || 10138;
    if (this.state.watched) {
      axios.put(`/media/watchHistory?${userId}?${mediaId}?${this.state.rating}`)
        .then((data) => {
          console.log('sucess updating history and rating');
        });
    }
  }

  handleRatingChange(e) {
    this.setState({
      rating: e.currentTarget.name
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

  handleOptionChange(event) {
    this.setState({
      watched: event.target.value
    });
  }

  render() {
    const { rating, preview } = this.state;

    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-body">
          <form className="watchedForm" onSubmit={this.handleSubmit}>
            <h3 className="didYouWatch">Did you watch {this.props.title}?</h3>
            <div className="watched">
              <label>
                <input className= "radio" type="radio" name="watched" value="true" onChange={this.handleOptionChange}></input>
                &nbsp;Yes&nbsp;&nbsp;
              </label>
              <label>
                <input className= "radio" type="radio" name="watched" value="false" onChange={this.handleOptionChange}></input>
                &nbsp;No
              </label>
            </div>
            <h5>What did you think?</h5>
            <div id="StarRatingInteractive" className="container" onMouseLeave={ this.handleBlur }>
              <StarRating avgRating={ preview || rating } interaction={{ preview: this.handleHover, select: this.handleRatingChange }} />
            </div>
            <br></br>
            <input className="submit" type="submit" value="Submit" onSubmit={this.handleSubmit} />
          </form>
          <br></br>
          <button onClick={this.props.onClose} className="button">x</button>
        </div>
      </div>
    );
  }
}

export default MediaModal;