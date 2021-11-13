const database = require('../database/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

database.getUserLogin = (/* { params } */) => {
  return new Promise((resolve, reject) => {
    resolve();
    // db.getUserLogin(reviewIdFilter)
    // .then(() => resolve())
    // .catch(error => {
    //   console.log('reportReview error:', error);
    //   console.log('Server error', error);
    //   reject({ statusCode: 500, message: error });
    // });
  });
};


database.getUser = (user) => {
  return new Promise((resolve, reject) => {
    database.User.find({ username: user })
      .then((res) => {
        const userObj = {
          username: res[0].username,
          email: res[0].email,
          platforms: res[0].subscriptions
        };
        resolve(userObj);
      })
      .catch((err) => {
        console.log('DB getUser Err', err);
        reject(err);
      });
  });
};

database.login = (username, password) => {
  return new Promise((resolve, reject) => {
    database.User.find({ username: username })
      .then((res) => {
        bcrypt.compare(password, res[0].pass, (err, result) => {
          if (err) {
            throw err;
          }
          resolve(result);
        });
      })
      .catch((err) => {
        console.log('DB Signin Err', err);
        reject(err);
      });
  });
};


database.addUser = (userObj) => {
  return new Promise((resolve, reject) => {
    const filter = { $or: [{ username: userObj.username }, { email: userObj.email }] };
    bcrypt.hash(userObj.password, saltRounds, function (err, hash) {
      const newUser = new database.User({
        name: userObj.name,
        username: userObj.username,
        pass: hash,
        email: userObj.email,
        subscriptions: userObj.platforms
      });
      database.User.updateMany(filter, newUser, { upsert: true })
        .then((user) => {
          console.log('RESOLVE', user);
          resolve(user);
        })
        .catch((err) => {
          console.log('DB ERR', err);
          reject(err);
        });
    });
  });
};


database.updateUser = (/* { params } */) => {
  return new Promise((resolve, reject) => {
    resolve();
    // db.getUserLogin(reviewIdFilter)
    // .then(() => resolve())
    // .catch(error => {
    //   console.log('reportReview error:', error);
    //   console.log('Server error', error);
    //   reject({ statusCode: 500, message: error });
    // });
  });
};

module.exports.database = database;