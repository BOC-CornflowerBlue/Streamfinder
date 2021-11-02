import React from 'react';
import StarRatingInteractive from '../sharedComponents/StarRatingInteractive';
import './MediaDetail.css';

const MediaDetail = props => (
  <div id="MovieDetail">
    <div className="overview-header">
      <h1 className="overview-title">Streamfinder</h1>
      <input className="overview-searchBar" type="text" placeholder="Search For Movies"/>
      {/* <img className="overview-homeIcon" src="../home/homeIcon.png"/>
      <img className="overview-userIcon" src="../home/userIcon.png"/> */}
    </div>
    <hr/>
    <div className="bannerImage">
      {/* <img className="overview-banner" src="bannerImage.jpeg"/> */}
    </div>
    <div className="aboutMovie">
      <h1 className="overview-aboutHeader">About "Movie Name"</h1>
      <p className="aboutDescription">About movie</p>
    </div>
    <div className="watchOn">
      <h2>Watch with your subscription on:</h2>
      <div className="watchOnIcons">
        Icon placeholder
      </div>
    </div>
    <hr/>
    <div className="Reviews">
      <h1>Reviews</h1>
      <StarRatingInteractive />
      <div className="eachReview">
        <h2>Reviews Placeholder</h2>
      </div>
    </div>
    <div className="addReview">
      <h1>Write your own review</h1>
      <input type="text" className="overview-userReview"/>
    </div>
    <button>Submit Review</button>
  </div>
);

export default MediaDetail;
