import React from 'react';
import MediaTileCarousel from '../sharedComponents/MediaTileCarousel';
import SearchBarActive from '../sharedComponents/SearchBarActive';
import './Home.css';
import axios from 'axios';
import LogOut from '../auth/LogOut';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.currentUser(),
      suggested: [],
      history: [],
      trending: []
    };
    this.handleMediaClick = this.handleMediaClick.bind(this);
  }

  componentDidMount() {
    const currentUser = this.props.currentUser();

    // if (currentUser && this.state.user !== currentUser) {
      console.log('hiii')
      console.log('User on current session: ', currentUser);
      console.log('User from prior session:', this.state.user);
      axios.get(`/home/homePage?${currentUser}`)
        .then(({data}) => {
          console.log('User data received:', data);

          this.setState({
            suggested: data.suggested,
            trending: data.trending,
            history: data.history,
            
          });
        });
    // }
    //if the prev props id is different from current and if id is not null
    //when this page is hit - it should run a ajax request to server

    //for the current id

  }

  handleMediaClick(event) {
    console.log('event: ', event);
  }


  render() {
    return (
      <div>
        {/* <div id="Search">
          <div className='test'>
            <h1 className='search-header'>Streamfinder</h1>
          </div>
          <input
            className='search-box'
            type="text"
            placeholder='search a movie to display streaming providers 🎣'
          />
          <button
            // onClick={this.handleClick} - figure out something here
            className='search-button'>Search
          </button>
        </div> */}
        <LogOut updateSession={this.props.updateSession} />
        <SearchBarActive />
        {/* <h2 className='s-header-home'>suggested</h2>
        <h2 className='s-header-home'>suggested</h2>
        <Temp data={this.state.suggested}/>

        <h2 className='t-header-home'>Trending</h2>
        <Temp data={this.state.trending}/>

        <h2 className='h-header-home'>History</h2>
        <Temp data={this.state.history}/> */}
        <MediaTileCarousel tempData={this.state.suggested} label={ "suggested" } onClick={this.handleMediaClick} />
        <MediaTileCarousel tempData={this.state.trending} label={ "trending" } onClick={this.handleMediaClick} />
        <MediaTileCarousel tempData={this.state.history} label={ "history" } onClick={this.handleMediaClick} />
      </div>
    );
  }
}

export default Home;
