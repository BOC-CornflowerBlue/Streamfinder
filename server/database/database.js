const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.localDB);
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
  mediaType: String,
  title: String,
  rating: Number,
  summary: String,
  reviews: [ReviewSchema],
  imgUrl: String,
  hulu: Boolean,
  disneyPlus: Boolean,
  netflix: Boolean,
  hboMax: Boolean,
  appleTvPlus: Boolean,
  amazonPrimeVideo: Boolean
});
const Movie = mongoose.model('Movie', MovieSchema);


module.exports = {
  db, User, Review, Movie
};