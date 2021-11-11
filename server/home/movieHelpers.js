module.exports = {
  // TODO: This is where we adjust the properties available for a movie displayed in the carousel.
  //    These currently are NOT all the properties needed.
  //    Needed:
  //      * Movie rating
  //      * List of platform providers: [
  //          { iconUrl, iconLink }
  //        ] ... or link to page of providers thumbnails with the data

  // TODO: A generic method could be created that just uses the collection property name specified rather than having 3 redundant methods
  transformSuggestedResponse: (queryResponse) => {
    return queryResponse.suggested
      ? queryResponse.suggested.map((movie) => {
        return {
          title: movie.title,
          imgUrl: movie.imgUrl
          // TODO: providers: See searchHelpers.transformToSearchDisplay
          // TODOL: rating: -> whereabouts unknown
        }
      })
      : [];
  },
  transformTrendingResponse: (queryResponse) => {
    return queryResponse.trending
      ? queryResponse.trending.map((movie) => {
        return {
          title: movie.title,
          imgUrl: movie.imgUrl
          // TODO: providers: See searchHelpers.transformToSearchDisplay
          // TODOL: rating: -> whereabouts unknown
        }
      })
      : [];
  },
  transformHistoryResponse: (queryResponse) => {
    return queryResponse.trending
      ? queryResponse.history.map((movie) => {
        return {
          title: movie[0].title,
          imgUrl: movie[0].imgUrl
          // TODO: providers: See searchHelpers.transformToSearchDisplay
          // TODOL: rating: -> whereabouts unknown
        }
      })
      : [];
  }
}

