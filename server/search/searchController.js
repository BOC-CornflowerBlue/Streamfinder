'use strict';
const { Logger } = require('../../logger.js');
const { getMovie } = require('./searchDB');

exports.getSearchInfo = (req, res, next) => {
  const title = decodeURI(req.body.title);
  const username = req.body.user;
  getMovie(title, username).then((searchDisplayData) => {
    res.send(searchDisplayData);
  });
  // TODO: No error handling
};


