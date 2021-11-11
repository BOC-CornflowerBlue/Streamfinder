import React from 'react';
import StarRatingInteractive from '../sharedComponents/StarRatingInteractive';
import Reviews from '../reviews/Reviews.jsx';
import './../media/MediaDetail.css';

const ReviewCard = review => {
  const { username, rating, content } = review;

  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div className='username'>{username}</div>
        <div className='userRating'>{rating}</div>
      </div>
      <div className='review-text'>
        {content}
      </div>
    </div>
  );
};

export default ReviewCard;
