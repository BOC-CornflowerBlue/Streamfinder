import React from 'react';
import './Home.css';
// import TempDisplay1 from '../Search/TempDisplay1';
import Temp from './Temp';

const Home = (props) => (

  <div>
    <div id="Search">
      <div className='test'>
        <h1 className='search-header'>Stream Finder</h1>
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
    <Temp data={props.suggested}/>

    <h2 className='t-header-home'>Trending</h2>
    <Temp data={props.trending}/>

    <h2 className='h-header-home'>History</h2>
    <Temp data={props.history}/>
  </div>
);

export default Home;
