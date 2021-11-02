import React from 'react';
import MediaTileCarousel from '../sharedComponents/MediaTileCarousel';
import './Home.css';
// import TempDisplay1 from '../Search/TempDisplay1';
import Temp from './Temp';
import data from './tempHomeData';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggested: data.suggested,
      history: data.history,
      trending: data.trending
    };
  }

  render() {
    return (
      <div>
        <div id="Search">
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
        </div>
        <h2 className='s-header-home'>suggested</h2>
        <Temp data={this.state.suggested}/>

        <h2 className='t-header-home'>Trending</h2>
        <Temp data={this.state.trending}/>

        <h2 className='h-header-home'>History</h2>
        <Temp data={this.state.history}/>
        {Object.keys(data).map((carouselLabel, i) => (
          <MediaTileCarousel key={`mtc${i}`} tempData={data[carouselLabel]} label={ carouselLabel } />
        ))}
      </div>
    );
  }
}

export default Home;
