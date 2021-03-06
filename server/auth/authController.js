'use strict';

const authService = require('./authService');

const {
  sendErrorResponse,
  sendResponse
} = require("../helpers");

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    authService.login(username, password)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send('Incorrect password');
      });
  } else {
    return sendErrorResponse({res, statusCode: 400, message: 'No credentials recieved'});
  }
};

exports.getUser = (req, res, next) => {
  const username = req.query['0'];
  if (username) {
    authService.getUser(username)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log('Server getUser Err', err);
        res.status(500).send(err);
      });
  } else {
    return sendErrorResponse({res, statusCode: 400, message: 'No username received'});
  }
};

exports.postUser = (req, res, next) => {
  const user = req.body;
  if (user.name === null) {
    res.status(201).send('Name required');
  }
  if (user.username === null) {
    res.status(201).send('Username required');
  }
  if (user.email === null) {
    res.status(201).send('Email required');
  }
  if (user.password === null) {
    res.status(201).send('Password required');
  }
  if (user.name && user.username && user.email && user.password) {
    authService.postUser(user)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    return sendErrorResponse({res, statusCode: 400, message: 'No credentials received'});
  }
};

exports.putUser = (req, res, next) => {
  const user = req.body;
  if (user) {
    authService.putUser(user)
      .then(result => sendResponse({ res, responseBody: result.data }))
      .catch(error => sendErrorResponse({ res, statusCode: error.statusCode, message: error.message }));
  } else {
    return sendErrorResponse({res, statusCode: 400, message: 'No user found'});
  }
};