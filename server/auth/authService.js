'use strict';

// Can swap for http API call here
const authDB = require('./authDB');
const { api } = require('./authAPI');

exports.login = (username, password) => {
  return authDB.login(String(username), String(password));
};

exports.verifySession = (token) => {
  return authDB.verifySession(String(token));
};

exports.getUser = (user) => {
  return authDB.getUser(String(user));
};

exports.postUser = (user) => {
  return authDB.addUser(String(user));
  // TODO: Add user to cache as well?
};

exports.putUser = (user) => {
  return authDB.updateUser(String(user));
};
