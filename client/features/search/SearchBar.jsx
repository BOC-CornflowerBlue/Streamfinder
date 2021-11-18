import React from 'react';
import { Redirect } from 'react-router-dom';

import { Logger } from '../../../logger.js'

import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      searchTerm: '',
      redirect: null
    };
  }

  handleChange(e) {
    const searchTerm = e.currentTarget.value;
    this.setState({ searchTerm });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSearch(this.state.searchTerm, this.props.onSearch)
    .then(() => {
      this.setState({
        searchTerm: '',
        redirect: '/search'
      });
    });
  }

  handleKeyPress(e) {
    e.key === 'Enter' && this.handleSubmit(e);
  }

  render() {
    const { handleChange, handleSubmit, handleKeyPress } = this;

    return (
      <>
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
      {
        this.state.redirect && <Redirect to={ this.state.redirect } />
      }
      </>
    );
  }
}

export default SearchBar;
