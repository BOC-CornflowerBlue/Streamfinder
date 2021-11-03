import React from 'react';
import SearchBar from '../sharedComponents/SearchBar';
import activeMessage from '../sharedComponents/helpers/activeMessage';
import TMDB_image from '../TMDB/TMDB_image';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.activePlaceholder = this.activePlaceholder.bind(this);
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.revertPlaceholder = this.revertPlaceholder.bind(this);

    this.placeholder = 'Search content by title';
    this.cancelActiveMessage = undefined;

    this.state = {
      searchResults: [],
      placeholder: this.placeholder,
      activeMessage: undefined
    }
  }

  handleClick(e) {

  }

  handleKeyPress(e) {
    e.key === 'Enter' && this.handleSubmit(e);
  }

  handleSearch(searchTerm) {
    this.cancelActiveMessage = activeMessage(`Searching for content titled "${searchTerm}"`, this.updatePlaceholder);
    // setTimeout(this.revertPlaceholder, 2000);
  }

  revertPlaceholder() {
    this.cancelActiveMessage();
    this.setState({ placeholder: this.placeholder });
  }

  updatePlaceholder(message) {
    this.setState({ placeholder: message || this.placeholder });
  }

  activePlaceholder(message) {
    setInterval(this.updatePlaceholder, 200);
  }

  render() {
    const { searchTerm, placeholder } = this.state;
    const { handleSearch } = this;

    return (
      <div id="Search">
        <h1 className="home-title">Streamfinder</h1>
        <SearchBar placeholder={ placeholder } handleSearch={ handleSearch } />
      </div>
    );
  }
}

export default Search;
