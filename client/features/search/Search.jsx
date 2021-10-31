import React from 'react';
import './Search.css';
import axios from 'axios'
import { iron_man } from './tempData';
import TempDisplay1 from './TempDisplay1';
import TempDisplay2 from './TempDisplay2';
//remove once carosel can be installed/replace in Search class

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_val:'',
      search_display: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handle_search = this.handle_search.bind(this);
  }
  handle_search(e) {
    //sets up search_val state to be sent to server for processing
    let search_value = e.target.value 
    this.setState({
      search_val: search_value
    })
  }
  handleClick(e) {
    //sends search value state/updates state
    //do stuff with server
    //set state with results
    this.setState({
      search_display: iron_man
    })
  }
  render() {
    return (
      <div>
        <div id="Search">
          <h1 className='search-header'>Stream Finder</h1>
          <input 
            className='search-box' 
            type="text"
            placeholder='search a movie to display streaming providers 🎣' 
            value={this.state.search_val}
            onChange={this.handle_search}
          />
          <button 
            onClick={this.handleClick}
            className='search-button'>Search
          </button>
        </div>
        <TempDisplay1 data={this.state.search_display}/>
        <TempDisplay2 data={this.state.search_display}/>

      </div>
    );
  }
}

export default Search;