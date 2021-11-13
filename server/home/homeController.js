'use strict';

const { getMovie, getHistory } = require('./homeDB');
const { transformSuggestedResponse, transformHistoryResponse, transformTrendingResponse } = require('./movieHelpers');

exports.getHomeInfo = (req, res, next) => {
  const user = req.url.split('?')[1];
  let queryUser = user.replace('%20', ' ');

  getHistory(queryUser).then((userObj) => {
   
    let userId = userObj.currentId;
    getMovie(userId).then((sAndTData) => {
      let history = transformHistoryResponse({history: userObj.history})
      history = history.filter((value, index, self) => {
        return self.findIndex(v => v.title === value.title) === index;
      })
      console.log(history)

      const finalData = {
        history,
        suggested: transformSuggestedResponse({suggested: sAndTData.suggested}),
        trending: transformTrendingResponse({trending: sAndTData.trending})
      };
      // console.log(finalData, "🚀");
      res.send(finalData);
    })
  })
}
