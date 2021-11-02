'use strict';

// Can swap for http API call here
const { database } = require('./authDB');
const { api } = require('./authAPI');

exports.login = (username, password) => {
  return database.login(user);
  // return cache.cacheRoute('productReviews', { productId, page, count, sortBy }, database.getUserLogin);
};

exports.getUser = (userId) => {
  return database.getUser(user);
};

exports.postUser = (user) => {
  return database.addUser(user);
  // TODO: Add user to cache as well?
};

exports.putUser = (user) => {
  return database.updateUser(user);
};