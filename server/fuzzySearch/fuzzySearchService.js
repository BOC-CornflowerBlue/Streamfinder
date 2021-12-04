'use strict';

const { Logger } = require('../../logger.js');
const { model } = require('./fuzzySearchModel.js');

exports.getFuzzySearch = (title) => {
  // TODO: Swap in when Redis cache functional
  // return cache.cacheRoute('movieSearches', { title }, model.getFuzzySearch);
  Logger.consoleLog('FuzzySearch Service');
  return model.getFuzzySearch(title);
};