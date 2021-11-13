module.exports = {
  transformSuggestedResponse: (queryResponse) => {
    const homeSuggestedDisplay = queryResponse.suggested.map((movieObj) => {
      const finalObj = {}
      finalObj.title = movieObj.title
      finalObj.imgUrl = movieObj.imgUrl
      if (movieObj.hulu !== null) {
        finalObj.hulu = movieObj.hulu
      }
      if (movieObj.hbo !== null) {
        finalObj.hbo = movieObj.hbo
      }
      if (movieObj.disney !== null) {
        finalObj.disney = movieObj.disney
      }
      if(movieObj.netflix !== null) {
        finalObj.netflix = movieObj.netflix
      }
      if(movieObj.apple !== null) {
        finalObj.apple = movieObj.apple
      }
      if (movieObj.amazon !== null) {
        finalObj.amazon = movieObj.amazon
      }
      return finalObj
    })

    return homeSuggestedDisplay

  },
  transformTrendingResponse: (queryResponse) => {
    const homeTrendingDisplay = queryResponse.trending.map((movieObj) => {
      const finalObj = {}

      finalObj.title = movieObj.title
      finalObj.imgUrl = movieObj.imgUrl
      if (movieObj.hulu !== null) {
        finalObj.hulu = movieObj.hulu
      }
      if (movieObj.hbo !== null) {
        finalObj.hbo = movieObj.hbo
      }
      if (movieObj.disney !== null) {
        finalObj.disney = movieObj.disney
      }
      if(movieObj.netflix !== null) {
        finalObj.netflix = movieObj.netflix
      }
      if(movieObj.apple !== null) {
        finalObj.apple = movieObj.apple
      }
      if (movieObj.amazon !== null) {
        finalObj.amazon = movieObj.amazon
      }
      return finalObj
    })
    return homeTrendingDisplay
  },

  transformHistoryResponse: (queryResponse) => {
    const homeHistoryDisplay = queryResponse.history.map((movieObj) => {
      const finalObj = {}

      finalObj.title = movieObj[0].title
      finalObj.imgUrl = movieObj[0].imgUrl
      if (movieObj[0].hulu !== null) {
        finalObj.hulu = movieObj[0].hulu
      }
      if (movieObj[0].hbo !== null) {
        finalObj.hbo = movieObj[0].hbo
      }
      if (movieObj[0].disney !== null) {
        finalObj.disney = movieObj[0].disney
      }
      if(movieObj[0].netflix !== null) {
        finalObj.netflix = movieObj[0].netflix
      }
      if(movieObj[0].apple !== null) {
        finalObj.apple = movieObj[0].apple
      }
      if (movieObj[0].amazon !== null) {
        finalObj.amazon = movieObj[0].amazon
      }
      return finalObj
    })
    return homeHistoryDisplay
  }
}
