import React from 'react';
import SearchBar from '../sharedComponents/SearchBar'; // TODO: Use this
import activeMessage from '../sharedComponents/helpers/activeMessage'; // TBD: Not used. Not needed? Seems to already be in SearchBar
import './Search.css';
import axios from 'axios';


// TODO: Remove TempDisplay components once carousel can be installed/replace in Search class
import TempDisplay1 from './TempDisplay1';
import TempDisplay2 from './TempDisplay2';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: '',
      user: 'lil timmy',
      searchDisplay: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    this.setState({
      searchVal: e.target.value
    });
  }

  handleClick(e) {
    axios.post('/search/searchPost', {
      title: this.state.searchVal,
      user:'lil timmy'
    })
    .then(({data}) => {
      this.setState({
        searchDisplay: data
      })
    })
  }
  render() {
    const { searchTerm, placeholder } = this.state;

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