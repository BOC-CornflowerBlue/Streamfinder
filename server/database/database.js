const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
require('dotenv').config();
const { Logger } = require('../../logger.js');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.localDB);
mongoose.connection.once('open', () => {
  Logger.consoleLog('Connected to Database');
});
mongoose.connection.on('error', (err) => console.log('error :', err));
const db = mongoose.connection;

//create your schemas here

const UserSchema = mongoose.Schema({
  name: String,
  username: String,
  pass: String,
  email: String,
  subscriptions: [],
  currentId: Number,
  history: [Array]
});

const User = mongoose.model('User', UserSchema);

const ReviewSchema = mongoose.Schema({
  username: String,
  rating: Number,
  date: {type: Date, default: Date.now},
  content: String
});
const Review = mongoose.model('Review', ReviewSchema);

const MovieSchema = mongoose.Schema({
  id: Number,
  //need to modify later like reviews
  imdb_id: Number,
  suggested: Array,
  trending: Array, // TODO: Rework this. This is a list of movies currently trending at the time a movie search is made
  //modify --- needs to happen - rob being lazy atm
  mediaType: String,
  title: String,
  //is this related to reviews? - if so pull the rating from the nested reviews schema
  rating: Number,
  ratingCount: Number,
  summary: String,
  reviews: [ReviewSchema],
  imgUrl: String,
  hulu: String,
  disney: String,
  netflix: String,
  hbo: String,
  apple: String,
  amazon: String,
  confidenceScore: Number
});
MovieSchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });
const Movie = mongoose.model('Movie', MovieSchema);

//// Below rectroactively adds NGrams to existing documents for fuzzy search
//// Uncomment when running server to re-apply this, then comment out
// Movie.find({}).exec().then((movies) => {
//   console.log('Found movies.' + movies);
//   movies.forEach(function (movie) {
//     movie.save().then((savedMovie) => {
//           console.log('Saved user.' + savedMovie);
//       }).catch((err) => {
//           console.error('Could not save movie.' + err);
//       })
//   });

// }).catch((err) => {
//   console.error('Could not find user.' + err);
// });

module.exports = {
  db, User, Review, Movie
};