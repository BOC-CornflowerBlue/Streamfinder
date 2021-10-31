const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Streamfinder');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
})
mongoose.connection.on('error', (err) => console.log('error :', err))
const db = mongoose.connection


//create your schemas here

const UserSchema = mongoose.Schema({
  username: String,
  pass: String,
  email: String,
})

const User = mongoose.model('User', UserSchema);


const MovieSchema = mongoose.Schema({
  title: String,
  img_url: String,
  hulu: Boolean,
  disney: Boolean,
  netflix: Boolean,
})
const Movie = mongoose.model('Movie', MovieSchema) 

const ReviewSchema = mongoose.Schema({

})

module.exports = {
  db, User, Movie
}