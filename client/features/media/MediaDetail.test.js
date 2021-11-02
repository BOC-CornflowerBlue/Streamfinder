import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MediaDetail from './MediaDetail.jsx';
import SearchBar from './../sharedComponents/SearchBar.jsx';
import StarRating from './../sharedComponents/StarRating.jsx';
import Reviews from './../reviews/Reviews.jsx';


// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme



describe('<MediaDetail />', () => {
  it('renders without crashing given the required props', () => {
    const wrapper = shallow(<MediaDetail />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render <SearchBar />, <StarRating />, and <Reviews /> components', () => {
    const wrapper = shallow(<MediaDetail />);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
    expect(wrapper.find(StarRating)).toHaveLength(1);
    // expect(wrapper.find(Reviews)).toHaveLength(1);
  });

});



/*tests that need to be written:

describe: MEDIA DETAIL COMPONENT
As a user, I would like to be able to find out more about a video by clicking on its thumbnail tile.
A component containing an ‘about media’ subcomponent,
a ‘watch with your subscriptions’ subcomponent,
a ‘watch on other platforms’ subcomponent,
a ‘reviews’ subcomponent,
and a ‘rating’ subcomponent.

describe: ABOUT MEDIA SUBCOMPONENT
A subcomponent that contains an image,
the video’s current 5 star rating,
the individual video’s title,
and a paragraph about that video.
  *A larger version of the video’s thumbnail image
  *Below the image is the video’s current star rating with a link next to it
  *Below the rating is the header “About <Video Name>”
  *Below the header is a paragraph with a description/summary of the video

describe: WATCH WITH YOUR SUBSCRIPTIONS SUBCOMPONENT
A subcomponent that contains a header “Watch with your subscriptions on” next to a list of the user’s subscriptions and their logos that act as links.
  *A platform’s logo/thumbnail will only appear if the user is subscribed to the platform and the platform has this movie available to watch.
  *The platform logo will act as a link that, when clicked, will open a new window to that movie on the platform’s website/app.
  *If the movie is not available on any of the user’s subscriptions, a header will replace this subcomponent that says, “This movie is unavailable with your current subscriptions.”

describe: WATCH ON OTHER PLATFORMS SUBCOMPONENT
A subcomponent that contains a header “Watch on” next to a list of platforms and their logos that act as links.
  *A platform’s logo/thumbnail will only appear if the user is not subscribed to the platform and the platform has this movie available to watch.
  *The platform logo will act as a link that, when clicked, will redirect to the streaming platform’s website/app.
  *If the movie is not available on any of the user’s subscriptions, a header will replace this subcomponent that says, “This movie is unavailable.”

describe: REVIEWS SUBCOMPONENT
A subcomponent with a Header, “Reviews”,
a list of reviews previewing individual review subcomponents,
and a form to write your own review subcomponent.
  *A header with “Reviews” will appear at the top of the component
  *Up to 5 individual reviews will appear in the displayed reviews list
  *If the 5 individual reviews take up more than the allotted space, a scroll bar will appear
  *If there are more than 5 individual reviews, a link/button with “see more reviews ...” will appear below the list (or below the scrollable window).
    Upon clicking this, up to 5 more individual reviews will load. The link/button will continue to appear until there are no more individual reviews to load.
  *If there are no reviews for the current movie yet, text will replace the reviews list: “There are no reviews yet.
  *Below the list of reviews will be the Write Your Own Review Sub-Subcomponent

describe: INDIVIDUAL REVIEWS SUBCOMPONENT
A subcomponent that contains a paragraph holding a review about the video,
the reviewer’s username,
the reviewer’s rating,
and the date it was written.
  *Will display the reviewer’s rating of the video in 1-5 star format.
  *Will display a paragraph below the rating with the entire review of this video
  *Below the review paragraph, the reviewer’s username will appear
  *Next to the reviewer’s name will be the date that the review was written

describe: WRITE YOUR OWN REVIEW SUBCOMPONENT
A subcomponent that contains a form title,
a text area,
the ability to select 1-5 stars,
and a submit form button.
  *Header or form title will read “Write Your Own Review”
  *Below the form title will be a text area box where the user can write a review consisting of at least 20 and up to 2000 characters.
  *Below the text area will be a Rating Subcomponent which the user can click to fill in one or more stars indicating how they feel about the video.
  *A submit form button that reads “Submit Review” will appear below the star rating. Upon submission, the textarea, star rating,
    and submit button are replaced with text “Thank you for your review!”. The review and star rating will be parsed and posted to the database
    where the date and the user’s name will be included.

describe: RATING SUBCOMPONENT
A subcomponent containing an “Enjoy the Video?” prompt,
thumbs up and thumbs down options,
and an interactive star rating subcomponent.
  *Next to the movie’s description/summary will be a clickable thumbs up emoticon and a clickable thumbs down emoticon.
  *In between the emoticon is the text, “Enjoy the Video?”
  *Upon clicking a thumbs up or thumbs down (these likes are added into the database for this user to use for algorithms), the user cannot click a thumb again.
  *Below this is 5 stars.
  *The user can interact with the five stars and click on the star corresponding to his/her/their feelings about the movie.
  *Once clicked, the rating is submitted to the database and the user cannot click again.

  */