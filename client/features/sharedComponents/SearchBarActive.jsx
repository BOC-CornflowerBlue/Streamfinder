import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  handleChange(e) {
    this.setState({ searchTerm: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    searchTerm && this.props.handleSearch(searchTerm);
    this.setState({ searchTerm: '' });
  }

  handleKeyPress(e) {
    e.key === 'Enter' && this.handleSubmit(e);
  }

  render() {
    const { handleChange, handleSubmit, handleKeyPress } = this;

    return (
      <div id="SearchBar">
        <form id="ss-search-form" onSubmit={ handleSubmit }>
          <input className="ss-search-bar" type="text"
            placeholder={ this.props.placeholder }
            value={ this.state.searchTerm }
            onChange={ handleChange }
            onKeyPress={ handleKeyPress }
          />
          <input id="ss-submit" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
