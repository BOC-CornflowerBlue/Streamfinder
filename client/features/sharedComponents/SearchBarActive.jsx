import React from 'react';
import SearchBar from '../sharedComponents/SearchBar';
import activeMessage from '../sharedComponents/helpers/activeMessage';
import TMDBimage from '../TMDB/TMDB_image';

class SearchBarActive extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.activePlaceholder = this.activePlaceholder.bind(this);
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.revertPlaceholder = this.revertPlaceholder.bind(this);

    this.placeholder = 'Search content by title';
    this.cancelActiveMessage = undefined;

    this.state = {
      placeholder: this.placeholder,
      activeMessage: undefined
    };
  }

  handleClick(e) {

  }

  handleKeyPress(e) {
    e.key === 'Enter' && this.handleSubmit(e);
  }

  onSearch(searchTerm) {
    // activeMessage uses setInterval, so it returns a function that will clear the interval when invoked
    this.cancelActiveMessage = activeMessage(`Searching for content titled "${searchTerm}"`, this.updatePlaceholder);
    // this.props.onSearch(searchTerm);
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
    const { onSearch } = this;

    return (
      <>
        <SearchBar placeholder={ placeholder } onSearch={ onSearch } />
      </>
    );
  }
}

export default SearchBarActive;
