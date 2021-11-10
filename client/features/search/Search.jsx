import React from 'react';
import './Search.css';
import axios from 'axios';
import MediaTileCarousel from '../sharedComponents/MediaTileCarousel';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: '',
      user: 'lil timmy',
      searchDisplay: [],
      current: null,
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
    let obj = {title: this.state.searchVal, user:'lil timmy'}
    axios.post('/search/searchPost', obj)
      .then(({data}) => {
        console.log(data)

        this.setState({
          searchDisplay: data,
        })
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
            value={this.state.searchVal}
            onChange={this.handleSearch}
          />
          <button
            onClick={this.handleClick}
            className='search-button'>Search
          </button>
        </div>
        {this.state.searchDisplay.length ?
          <MediaTileCarousel tempData={this.state.searchDisplay} label={ 'Search Results' } />
          :
          <div></div>
        }      

      </div>
    );
  }
}

export default Search;