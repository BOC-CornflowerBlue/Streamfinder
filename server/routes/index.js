'use strict';

const rootRouter = require('./root');
const homeRouter = require('./home');
const searchRouter = require('./search');
const authorizationRouter = require('./auth');
const homeController = require('../home/homeController')
// const ratingsReviewsRouter = require('./ratingsReviews');

module.exports = (app) => {
  app.use('/', rootRouter);
  //temp
  app.use('/', homeController.getHomeInfo)
  //temp
  app.use('/home', homeRouter);
  app.use('/search', searchRouter);
  app.use('/auth', authorizationRouter);
  // app.use('/reviews', ratingsReviewsRouter);
};