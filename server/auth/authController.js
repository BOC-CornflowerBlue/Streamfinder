'use strict';

const authService = require('./authService');

const {
  sendErrorResponse,
  sendResponse
} = require("../helpers");

exports.login = (req, res, next) => {
  const username = req.query.review_id;
  const password = req.query.password;
  if (username && password) {
    authService.login(username, password)
    .then(result => sendResponse({ res, responseBody: result.data }))
    .catch(error => sendErrorResponse({ res, statusCode: error.statusCode, message: error.message }));
  } else {
    return sendErrorResponse({res, statusCode: 400, message: ''});
  }
};

exports.getUser = (req, res, next) => {
  const username = req.query.review_id;
  if (username) {
    authService.getUser(username)
    .then(result => sendResponse({ res, responseBody: result.data }))
    .catch(error => sendErrorResponse({ res, statusCode: error.statusCode, message: error.message }));
  } else {
    return sendErrorResponse({res, statusCode: 400, message: ''});
  }
};

exports.postUser = (req, res, next) => {
  const user = req.body;
  if (user) {
    authService.postUser(user)
    .then(result => sendResponse({ res, responseBody: result.data }))
    .catch(error => sendErrorResponse({ res, statusCode: error.statusCode, message: error.message }));
  } else {
    return sendErrorResponse({res, statusCode: 400, message: ''});
  }
};

exports.putUser = (req, res, next) => {
  const user = req.body;
  if (user) {
    authService.putUser(user)
    .then(result => sendResponse({ res, responseBody: result.data }))
    .catch(error => sendErrorResponse({ res, statusCode: error.statusCode, message: error.message }));
  } else {
    return sendErrorResponse({res, statusCode: 400, message: ''});
  }
}
