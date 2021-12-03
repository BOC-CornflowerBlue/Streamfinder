'use strict';
const { Logger } = require('../../logger.js');

const { getMovie, getHistory } = require('./homeDB');
const { transformSuggestedResponse, transformHistoryResponse, transformTrendingResponse } = require('./movieHelpers');

exports.getHomeInfo = (req, res, next) => {
  const user = req.url.split('?')[1]; // TODO: Access this through req object params
  let queryUser = user.replace('%20', ' '); // TODO: URI Decode
  getHistory(queryUser).then((historyData) => {
    getMovie(historyData.currentId).then((newWatchData) => {
      const finalData = {
        history: transformHistoryResponse({history: historyData.history}),
        suggested: transformSuggestedResponse({suggested: newWatchData.suggested}),
        trending: transformTrendingResponse({trending: newWatchData.trending})
      };
      Logger.consoleLog('finalData:', finalData);
      res.send(finalData);
    })
    // TODO: No error handling
  })
}
