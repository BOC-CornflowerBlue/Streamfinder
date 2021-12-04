const mongoose = require('mongoose');
require('dotenv').config();
const { Logger } = require('../../logger.js');

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
  // imdb_id: Number,
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
  amazon: String
});
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
  db, User, Review, Movie
};