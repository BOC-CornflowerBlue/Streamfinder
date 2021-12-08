'use strict';
const { Logger } = require('../../logger.js');
const {
  sendErrorResponse,
  sendResponse
} = require("../helpers");
const suggestedService = require('./suggestedService');

exports.getSuggested = (req, res, next) => {
  const username = req.body.user;

  if (!username) {
    return sendErrorResponse({
      res,
      statusCode: 400,
      message: 'Username missing. User must be logged in to use this feature.'
    });
  } else {
    suggestedService.getSuggested(username)
    .then(result => sendResponse({ res, responseBody: result }))
    .catch(error => {
      Logger.consoleLog('getSuggested route error', error);
      sendErrorResponse({
        res,
        statusCode: error.statusCode,
        message: error.message
      });
    })
  }
};