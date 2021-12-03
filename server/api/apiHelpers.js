const { Logger } = require('../../logger.js');

const extractVideo = (result, imgUrl, width=1280) => {
  Logger.consoleLog('result: ', result);
  Logger.consoleLog('imgUrl: ', imgUrl);
  Logger.consoleLog('width: ', width);
  return {
    id: result.id,
    mediaType: 'Movie',
    title: result.title,
    summary: result.overview,
    rating: result.vote_average,
    ratingCount: result.vote_count,
    imgUrl: `https://www.themoviedb.org/t/p/w${width}${imgUrl}`,
    hulu: null,
    disney: null,
    netflix: null,
    hbo: null,
    apple: null,
    amazon: null
  };
}

const extractVideos = (data) => {
  let videos = data.results.map(result => {
    let imgUrl = ''; // TODO: insert fallback thumbnail here
    if (result.backdrop_path) {
      imgUrl = result.backdrop_path;
    } else if (result.poster_path) {
      imgUrl = result.poster_path;
    }

    return extractVideo(result, imgUrl);
  });
  videos = videos.filter((video) => { if (video !== undefined) { return video; } });
  return videos;
}

module.exports = {
  extractVideo,
  extractVideos
};