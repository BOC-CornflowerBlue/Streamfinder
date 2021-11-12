import React from 'react';
import StarRatingInteractive from '../sharedComponents/StarRatingInteractive';
import Reviews from '../reviews/Reviews.jsx';
import './../media/MediaDetail.css';
import StarRating from '../sharedComponents/StarRating.jsx';

const ReviewCard = review => {
  const { username, rating, content, thisUsersReview } = review;

  let divClass = 'review-card';

  if (thisUsersReview) {
    divClass = divClass + ' this-users-review';
  }

  return (
    <div className={divClass} >
      <div className='review-card-header'>
        <div className='username'>{username}</div>
        <div className='userRating'><StarRating avgRating={rating} /></div>
      </div>
      <div className='review-text'>
        {content}
      </div>
    </div>
  );
};

export default ReviewCard;
