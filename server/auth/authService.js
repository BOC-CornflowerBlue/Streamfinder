'use strict';

// Can swap for http API call here
const authDB = require('./authDB');
const { api } = require('./authAPI');

exports.login = (username, password) => {
  return authDB.login(username, password);
};

exports.verifySession = (token) => {
  return authDB.verifySession(token);
};

exports.getUser = (user) => {
  return authDB.getUser(user);
};

exports.postUser = (user) => {
  return authDB.addUser(user);
  // TODO: Add user to cache as well?
};

exports.putUser = (user) => {
  return authDB.updateUser(user);
};
