import React from 'react';
import SearchBar from '../sharedComponents/SearchBar';
import activeMessage from '../sharedComponents/helpers/activeMessage';

class SearchBarActive extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.activePlaceholder = this.activePlaceholder.bind(this); // MPT: Not used
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.revertPlaceholder = this.revertPlaceholder.bind(this); // MPT: Not used

    this.placeholder = 'Search content by title';
    this.cancelActiveMessage = undefined; // MPT: Assigned but not used

    this.state = {
      placeholder: this.placeholder,
      activeMessage: undefined
    };
  }

  onSearch(searchTerm) {
    // activeMessage uses setInterval, so it returns a function that will clear the interval when invoked
    this.cancelActiveMessage = activeMessage(`Searching for content titled "${searchTerm}"`, this.updatePlaceholder);
  }

  updatePlaceholder(message) {
    this.setState({ placeholder: message || this.placeholder });
  }

  // MPT: Not used
  revertPlaceholder() {
    this.cancelActiveMessage();
    this.setState({ placeholder: this.placeholder });
  }

  // MPT: Not used
  activePlaceholder(message) {
    setInterval(this.updatePlaceholder, 200);
  }

  render() {
    const { placeholder } = this.state;
    const { onSearch } = this;

    return (
      <>
        <SearchBar placeholder={ placeholder } onSearch={ onSearch } />
      </>
    );
  }
}

export default SearchBarActive;
