const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.localDB);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});
mongoose.connection.on('error', (err) => console.log('error :', err));
const db = mongoose.connection;


//create your schemas here

const UserSchema = mongoose.Schema({
  username: String,
  pass: String,
  email: String,
  subscriptions: [String]
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
  mediaType: String,
  title: String,
  summary: String,
  reviews: [ReviewSchema],
  imgUrl: String,
  hulu: String,
  disneyPlus: String,
  netflix: String,
  hboMax: String,
  appleTvPlus: String,
  amazonPrimeVideo: String
});
const Movie = mongoose.model('Movie', MovieSchema);


module.exports = {
  db, User, Review, Movie
};