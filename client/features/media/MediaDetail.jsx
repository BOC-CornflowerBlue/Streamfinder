import React from 'react';
import StarRatingInteractive from '../sharedComponents/StarRatingInteractive';
import StarRating from '../sharedComponents/StarRating';
import SearchBar from './../sharedComponents/SearchBar.jsx';
import Reviews from './../reviews/Reviews.jsx';
import test from './testData.js';
import './MediaDetail.css';

//figure out how to wrap with error boundary and logger
//need to find a way to get banner images to each movie/tv show

class MediaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      mediaType: '',
      name: '',
      rating: '',
      summary: '',
      subscriptions: [],
      reviews: [],
      imgUrl: '',
      userSubs: [],
      watchWithSubscribed: [],
      watchWithUnsubscribed: []
    };
    this.getMediaAndUserDetails = this.getMediaAndUserDetails.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  componentDidMount() {
    this.getMediaAndUserDetails();
  }

  getMediaAndUserDetails() {
    //this will be a request to the db to get media info to apply to state
    let subs = test.subscriptions;

    //on success, another request to db to find out what subscriptions the user has OR this can be passed to me in props
    //I will need the userId passed to me in props
    let userSubs = test.userSubs;

    //on success do some logic
    let services = [];
    let nonservices = [];
    for (let i = 0; i < subs.length; i++) {
      if (userSubs.includes(subs[i])) {
        services.push(subs[i]);
      } else {
        nonservices.push(subs[i]);
      }
    }

    this.setState({
      id: test.id,
      mediaType: test.mediaType,
      name: test.name,
      rating: test.rating,
      summary: test.summary,
      subscriptions: subs,
      reviews: test.reviews,
      imgUrl: test.thumbnail,
      userSubs: userSubs,
      watchWithSubscribed: services,
      watchWithUnsubscribed: nonservices
    });
  }

  handleLogoClick() {
    //notify home component that user has watched the movie?
  }

  render() {
    let subscribed = this.state.watchWithSubscribed.map((name, i) => {
      return <a
        key={`subscribed-${i}`}
        href={`//www.${name}.com`}
        target='_blank'>
        <img
          className='streamingLogo'
          src={`${test.logos[name]}`}
          key={`subscribed-${i}`}
          alt={`${name} logo`}
          onClick={this.handleLogoClick}
        />
      </a>;
    });

    let unsubscribed = this.state.watchWithUnsubscribed.map((name, i) => {
      return <a
        key={`unsubscribed-${i}`}
        href={`//www.${name}.com`}
        target='_blank'>
        <img
          className='streamingLogo'
          src={`${test.logos[name]}`}
          alt={`${name} logo`}
          onClick={this.handleLogoClick}
        />
      </a>;
    });

    let subLengthStatement,
      unsubLengthStatement;
    if (this.state.watchWithSubscribed.length === 0) {
      subLengthStatement = 'Not available to watch on any of your subscriptions';
    } else if (this.state.watchWithSubscribed.length === 1) {
      subLengthStatement = 'Watch with your subscription on:';
    } else {
      subLengthStatement = 'Watch with your subscriptions on:';
    }

    if (this.state.watchWithUnsubscribed.length === 0) {
      unsubLengthStatement = 'Not available to watch on any other providers';
    } else if (this.state.watchWithUnubscribed.length === 1) {
      unsubLengthStatement = 'Also available on this other provider:';
    } else {
      unsubLengthStatement = 'Also available on these other providers:';
    }

    return (
      <div id="MovieDetail">
        <div className="overview-header">
          <h1 className="overview-title">Streamfinder</h1>
          <SearchBar />
        </div>
        <hr/>
        <div className="bannerImage">
          <img className="overview-banner" src={this.state.imgUrl} alt="media poster"/>
        </div>
        <h1 className="mediaTitle">{this.state.name}</h1>
        <div className="mediaRating">
          {/* Originally we were gonna have an interactive star rating here and also a thumbs up or thumbs down...
          Is this where we want the user to rate the media?
          Are we keeping track of media likes or dislikes somewhere? */}
          <StarRating avgRating={this.state.rating} />
        </div>
        <div className="aboutMovie">
          <h2 className="overview-aboutHeader">About {this.state.name}</h2>
          <p className="aboutDescription">{this.state.summary}</p>
        </div>
        <div className="watchOn">
          <h2>{subLengthStatement}</h2>
          <div className="watchOnIcons">
            {subscribed}
          </div>
          <h2>{unsubLengthStatement}</h2>
          <div className="watchOnIcons">
            {unsubscribed}
          </div>
        </div>
        <hr/>
        <div className="Reviews">
          {/* cannot render reviews until I have this.props.userId passed to me
           <Reviews
            userId={this.props.userId}
            mediaId={this.state.id}
          /> */}
        </div>
      </div>
    );
  }
}

export default MediaDetail;