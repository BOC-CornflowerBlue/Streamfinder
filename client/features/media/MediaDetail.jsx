import React from 'react';
import axios from 'axios';
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
      mediaType: '',
      name: '',
      rating: '',
      ratingCount: '',
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
    this.getLogoUrl = this.getLogoUrl.bind(this);
    this.getServiceUrl = this.getServiceUrl.bind(this);
  }

  componentDidMount() {
    this.getMediaAndUserDetails();
  }

  getMediaAndUserDetails() {
    let userSubs;
    let subs = [];
    let userId = this.props.userId;
    //mediaId should come from props, but for now
    let mediaId = 10138;
    //this will be a request to the db to get media info to apply to state
    axios.get(`/media/userSubs?${userId}`)
      .then(({data}) => {
        userSubs = data;
      })
      .then(() => {
        axios.get(`/media/mediaDetails?${mediaId}`)
          .then(({data}) => {
            if (data.hulu) {
              subs.push('Hulu');
            }
            if (data.disney) {
              subs.push('Disney Plus');
            }
            if (data.netflix) {
              subs.push('Netflix');
            }
            if (data.hbo) {
              subs.push('HBO Max');
            }
            if (data.apple) {
              subs.push('Apple TV Plus');
            }
            if (data.amazon) {
              subs.push('Amazon Prime Video');
            }

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
              mediaType: data.mediaType,
              name: data.title,
              rating: (data.rating / 2),
              ratingCount: data.ratingCount,
              summary: data.summary,
              subscriptions: subs,
              reviews: data.reviews,
              imgUrl: data.imgUrl,
              userSubs: userSubs,
              watchWithSubscribed: services,
              watchWithUnsubscribed: nonservices
            });
          });
      });
  }

  //this will be used to update user watch history
  handleLogoClick(event) {
    // //userId should come from props instead
    // let userId = 10130;
    // //mediaId should come from props instead
    // let mediaId = 10138;
    // axios.put(`/media/watchHistory?${userId}?${mediaId}`)
    //   .then((data) => {
    //     console.log('data: ', data)
    //   })
    // //notify home component that user has watched the movie?
    // //add movie object to user history
    console.log('logo clicked');
  }

  getLogoUrl(name) {
    if (name === 'Hulu') {
      return 'https://www.themoviedb.org/t/p/original/giwM8XX4V2AQb9vsoN7yti82tKK.jpg';
    } else if (name === 'Disney Plus') {
      return 'https://www.themoviedb.org/t/p/original/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg';
    } else if (name === 'Netflix') {
      return 'https://www.themoviedb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg';
    } else if (name === 'HBO Max') {
      return 'https://www.themoviedb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg';
    } else if (name === 'Apple TV Plus') {
      return 'https://www.themoviedb.org/t/p/original/A3WLxoSkmuxwaQkpfwL6H8WwWwM.jpg';
    } else if (name === 'Amazon Prime Video') {
      return 'https://www.themoviedb.org/t/p/original/68MNrwlkpF7WnmNPXLah69CR5cb.jpg';
    }
  }

  getServiceUrl(name) {
    if (name === 'Hulu') {
      return 'www.hulu.com';
    } else if (name === 'Disney Plus') {
      return 'disneyplus.com';
    } else if (name === 'Netflix') {
      return 'netflix.com';
    } else if (name === 'HBO Max') {
      return 'hbomax.com';
    } else if (name === 'Apple TV Plus') {
      return 'appletvplus.com';
    } else if (name === 'Amazon Prime Video') {
      return 'amazonprimevideo.com';
    }
  }

  render() {
    let subscribed = this.state.watchWithSubscribed.map((name, i) => {
      let logo = this.getLogoUrl(name);
      let website = this.getServiceUrl(name);
      return <a
        key={`subscribed-${i}`}
        href={`//${website}`}
        target='_blank'>
        <img
          className='streamingLogo'
          src={`${logo}`}
          key={`subscribed-${i}`}
          alt={`${name} logo`}
          onClick={this.handleLogoClick}
        />
      </a>;
    });

    let unsubscribed = this.state.watchWithUnsubscribed.map((name, i) => {
      let logo = this.getLogoUrl(name);
      let website = this.getServiceUrl(name);
      return <a
        key={`unsubscribed-${i}`}
        href={`${website}`}
        target='_blank'>
        <img
          className='streamingLogo'
          src={`${logo}`}
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
    } else if (this.state.watchWithUnsubscribed.length === 1) {
      unsubLengthStatement = 'Also available on this other provider:';
    } else {
      unsubLengthStatement = 'Also available on these other providers:';
    }

    return (
      <div id="mediaDetail">
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
          {/* cannot render reviews until I have this.props.userId passed to me */}
          <Reviews
            userId={this.props.userId}
            // I need mediaId passed to me from the component opening it
            mediaId={10138}
            reviews={this.state.reviews}
          />
        </div>
      </div>
    );
  }
}

export default MediaDetail;