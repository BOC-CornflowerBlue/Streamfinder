'use strict';

const { getMovie, getHistory } = require('./homeDB');
const { transformSuggestedResponse, transformHistoryResponse, transformTrendingResponse } = require('./movieHelpers');

exports.getHomeInfo = (req, res, next) => {
  const user = req.url.split('?')[1];
  let queryUser = user.replace('%20', ' ')
  getHistory(queryUser).then((historyData) => {
    getMovie(historyData.currentId).then((sAndTData) => {
      const finalData = {
        history: transformHistoryResponse({history: userObj.history}),
        suggested: transformSuggestedResponse({suggested: sAndTData.suggested}),
        trending: transformTrendingResponse({trending: sAndTData.trending})
      };
      // console.log(finalData, "🚀");
      res.send(finalData);
    })
  })
}
