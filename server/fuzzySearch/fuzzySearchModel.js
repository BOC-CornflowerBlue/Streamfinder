const { Logger } = require('../../logger.js');

const model = {};

model.getFuzzySearch = (title) => {
    Logger.consoleLog('FuzzySearch Model');
    return new Promise((resolve, reject) => {
      Logger.consoleLog('getFuzzySearch title: ', title);

      if (!title) {
        resolve([]);
      }

      // Get exact match
        // DB
        // API

      // if no exact match

      // get partial match
        // DB
        // API

      resolve(title);

      // 1. Entering a movie title which you know has an exact match in your database.
      // The result should be an array of movie objects with
      // the first movie being the exact match
      // the remaining (4-9 movies) being close in title.

      // 2. Entering a movie title which is misspelled.
      // The result should be an array of movie objects, (5-10 movies),
      // which match the correct spelling of the word and other closely related titles.
    });
  };

module.exports.model = model;