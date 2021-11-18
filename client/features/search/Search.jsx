import React from 'react';

import './Search.css';
import MediaTileCarousel from '../sharedComponents/MediaTileCarousel';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
        this.props.searchResults.length ?
          <MediaTileCarousel tempData={ this.props.searchResults } label={ 'Search Results' } />
          : <div></div>
        }
      </div>
    );
  }
}

export default Search;