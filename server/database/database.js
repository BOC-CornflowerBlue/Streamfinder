const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://127.0.0.1:27017/streamFinder');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
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
  currentId: Number
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
  suggested: Array,
  trending: Array,
  history: Array,
  //modify --- needs to happen - rob being lazy atm
  mediaType: String,
  title: String,
  rating: Number,
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