import React from 'react';
import StarRatingInteractive from '../sharedComponents/StarRatingInteractive';
import Reviews from '../reviews/Reviews.jsx';
import './../media/MediaDetail.css';
import StarRating from '../sharedComponents/StarRating.jsx';

const ReviewCard = review => {
  const { username, rating, content } = review;

  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div className='userRating'><StarRating avgRating={rating} /></div>
        <div className='username'>{username}</div>
        <div className='verified-status'>Verified streamer</div>
        <div className='posted-date'>Posted Nov 11, 2021</div>
      </div>
      <div className='review-card-text-wrapper'>
        <div className='movie-title'>
          Iron Man 2
        </div>
        <div className='review-content'>
          {content}
        </div>
        <div className='help-votes-wrapper'>
          <div className='help-vote'>
            <div className='icon'>👍</div>
            <div className='help-vote-count'>13</div>
          </div>
          <div className='help-vote'>
            <div className='icon'>👎</div>
            <div className='help-vote-count'>4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
