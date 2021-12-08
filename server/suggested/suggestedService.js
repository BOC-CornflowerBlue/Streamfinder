'use strict';

const { database } = require('./suggestedDB');
const { model } = require('./suggestedModel.js');

exports.getSuggested = (username) => {
  // TODO: Swap in when Redis cache functional
  // return cache.cacheRoute('movieSearches', { username }, model.getSuggested);
  return model.getSuggested(title);
};