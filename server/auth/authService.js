'use strict';

// Can swap for http API call here
const { database } = require('./authDB');
const { api } = require('./authAPI');

exports.login = (username, password) => {
  return database.login(username, password);
};

exports.getUser = (user) => {
  return database.getUser(user);
};

exports.postUser = (user) => {
  return database.addUser(user);
  // TODO: Add user to cache as well?
};

exports.putUser = (user) => {
  return database.updateUser(user);
};