import React from 'react';
import axios from 'axios';

import { Logger } from '../../../logger.js'
import homeTestData from './home.testData';

import MediaTileCarousel from '../sharedComponents/MediaTileCarousel';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    // TODO: replace 'homeTestData' with undefined once integrated with server
    this.movieTestData = props.movieData ? props.movieData : homeTestData;

    this.state = {
      user: this.props.currentUser(),
      mediaData: this.movieTestData ? this.movieTestData : {
        suggested: [],
        history: [],
        trending: []
      },
    };
    this.handleMediaClick = this.handleMediaClick.bind(this);
  }

  componentDidMount() {
    const currentUser = this.props.currentUser();
    if (currentUser && this.state.user !== currentUser) {
      Logger.consoleLog('User on current session: ', currentUser);
      Logger.consoleLog('User from prior session:', this.state.user);
      this.updateCurrentUserMovieData(currentUser);
    }
  }

  updateCurrentUserMovieData(currentUser) {
    axios.get(`/home/homePage?=${currentUser}`)
      .then(userData => {
        Logger.consoleLog('User data received:', userData);

        this.setState({
          suggested: userData.suggested,
          trending: userData.trending,
          history: userData.history,
        });
      })
      .catch(error => {
        Logger.consoleLog('updateCurrentUserData:', error);
      }
    );
  }

  handleMediaClick(event) {
    // TODO: Not used. See 'render' method.
    Logger.consoleLog('event: ', event);
  }

  render() {
    return (
      <div>
        {
        // TODO: onClick prop not used in component. Implement or remove
        Object.keys(this.state.mediaData).map((carouselLabel, i) => (
          <MediaTileCarousel
            key={`mtc${i}`}
            tempData={ this.state.mediaData[carouselLabel] }
            label={ carouselLabel }
            onClick={ this.handleMediaClick } />
        ))}
      </div>
    );
  }
}

export default Home;
