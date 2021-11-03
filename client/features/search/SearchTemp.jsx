import React from 'react';
import SearchBar from '../sharedComponents/SearchBar';
import activeMessage from '../sharedComponents/helpers/activeMessage';
import './Search.css';
import axios from 'axios';
import { ironMan } from './tempData';
import TempDisplay1 from './TempDisplay1';
import TempDisplay2 from './TempDisplay2';
//remove once carosel can be installed/replace in Search class

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: '',
      searchDisplay: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    //sets up searchVal state to be sent to server for processing
    let searchValue = e.target.value;
    this.setState({
      searchVal: searchValue
    });
  }

  handleClick(e) {
    //sends search value state/updates state
    //do stuff with server
    //set state with results
    this.setState({
      searchDisplay: ironMan
    });
  }
  render() {
    const { searchTerm, placeholder } = this.state;
    const { handleSearch } = this;

    return (
      <div>
        <div id="Search">
          <h1 className='search-header'>Stream Finder</h1>
          <input
            className='search-box'
            type="text"
            placeholder='search a movie to display streaming providers 🎣'
            value={this.state.searchVal}
            onChange={this.handleSearch}
          />
          <button
            onClick={this.handleClick}
            className='search-button'>Search
          </button>
        </div>
        <TempDisplay1 data={this.state.searchDisplay}/>
        <TempDisplay2 data={this.state.searchDisplay}/>

      </div>
    );
  }
}

export default Search;