'use strict';
const { Logger } = require('../../logger.js');
const {
  sendErrorResponse,
  sendResponse
} = require("../helpers");
const fuzzySearchService = require('./fuzzySearchService');

exports.getFuzzySearch = (req, res, next) => {
  const titleRaw = req.query.title;
  Logger.consoleLog('req.query.title: ', req.query.title);
  const username = req.body.user;

  if (!username) {
    return sendErrorResponse({
      res,
      statusCode: 400,
      message: 'Username missing. User must be logged in to use this feature.'
    });
  } else if(titleRaw) {
    const title = decodeURI(req.query.title);
    Logger.consoleLog('title: ', title);
    Logger.consoleLog('Username supplied!');
    fuzzySearchService.getFuzzySearch(title)
    .then(result => sendResponse({ res, responseBody: result }))
    .catch(error => {
      Logger.consoleLog('getFuzzySearch route error', error);
      sendErrorResponse({
        res,
        statusCode: error.statusCode,
        message: error.message
      });
    })
  } else {
    sendResponse({ res, responseBody: [] });
  }
};