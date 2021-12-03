// Another major development note here is that user 'previously watched' movie history may be incomplete.
// For purposes of development, this can be seeded and completed later for a more end-to-end interactive experience for
//    behavior affecting 'suggested' movies.

const movie = {
  "title": "",
  "imgUrl": ""
};

// ***=== Methods ===***
// === Suggested, Trending, History ===
const trendingWeight = (isTrending) => {

}

const relatedWeight = (isRelatedToWatched) => {

}

const relatedTrendingWeight = (isTrending, isRelatedToWatched) => {
  // Highest weight for trending movies that are related to previously watched movies
}

const ratingWeight = (rating) => {
  // switch statement for star ratings
  // e.g. 1 star gives a reduced rating, 2 neutral, and more stars increase a weighting.
}
const ratingWeightByReviews = (rating, numberOfRatings) => {
  let ratingWeight = ratingWeight(rating);
}
const ratingWeightByUser = (rating) => {
  // This value is gathered from the MediaModal.jsx file.
  let ratingWeight = ratingWeight(rating);
};

// === Search ===
const searchMatchQualityTitle = (matchingSearchPhrase, title) => {
  // Strongest weight for perfect match
  // Lesser weight for perfect matching of words
  // Even lesser weight partial matching of words
  // Least weight for other films (since the 3rd party API used can bring these in by keyword fuzzy searches, they may still be relevant)
};

const searchMatchQualityKeywords = (matchingSearchPhrase, keywords) => {
}

const searchMatchWeight = (matchQualityTitle, matchQualityKeywords) => {

}

// ***=== Properties ===***
// === Home === General
movie.isTrendingIMDB = false; // Note: This effect should fade with time as what is trending changes. Implement later. See: https://developers.themoviedb.org/3/trending/get-trending
movie.isRecommendedIMDB = false;
movie.starRating = 0;
movie.numberOfRatings = 0;

// === Home === User-Specific
movie.isRelatedToWatched = false;
movie.detailWasClicked = false;

// === Media Detail === User-Specific
movie.wasWatched = false;
movie.starRatingUser = 0;

// === Search === User-Specific
movie.matchingSearchPhrases = [
  'matchingSearchPhrase1',
  'matchingSearchPhrase2'
]

//  ***===Weights ===***
// General
movie.ratingWeight = 1;
movie.trendingWeight = 1;

// User-Specific
movie.trendingWeight = 1;   // User-specific === Refine
movie.relatedWeight = 1;   // User-specific
movie.searchMatchWeight = 1;    // User-specific
movie.userRatingWeight = 1;    // User-specific


// Genre matching should also be considered but app currently does not get that data from the API




// === CRUD-Hooking ===
// User review:
//    User movie rating
//    User watched movie confirmation
// Movie rating, other meta, any time movies are loaded (search, home page, etc.)
// User movie search

// === Click-Tracking ===
// User clicking on movie detail

// === Event Triggers ===
// Suggested movies are calculated asynchronously on the server during the following events, with no need to return the server request:
// Search submission - hook into search results, update movie detail clicks
// Movie review submission - hook into user movie ratings, update movie detail clicks
// Movie detail click - collect for next server hook

// Suggested movies are just read upon initial page load:
// Home page load