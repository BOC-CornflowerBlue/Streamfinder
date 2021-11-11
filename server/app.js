const express = require('express');
const path = require('path');
const cors = require('cors');
// const routes = require('./routes');
const router = require('express').Router();
const app = express();
app.disable('x-powered-by');
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const authorizationRouter = require('./routes/auth');
const mediaDetailRouter = require('./routes/mediaDetail');
const reviewsRouter = require('./routes/reviews');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
// const {default: Streamfinder} = require('../../client/app/Streamfinder.jsx');
require('dotenv').config();
const {db} = require('./database/database');
const clientBundleScript = '<script src="http://localhost:8080/scripts/bundle.js"></script>';
const clientBundleStyle = '<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">';
// app.use(cors());
// require('./cacheManager');
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'staticAssets')));

// routes(app);


app.use('/home', homeRouter);
app.use('/search', searchRouter);
app.use('/auth', authorizationRouter);
app.use('/media', mediaDetailRouter);
app.use('/reviews', reviewsRouter);




app.get('*', (req, res) => {
  // const jsx = ReactDOMServer.renderToString(<Streamfinder/>);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streamfinder</title>
        ${clientBundleStyle}
        <link rel="icon" type="image/png" href="cornflower.png">
      </head>
      <body>
        <div id="Streamfinder"></div>
        ${clientBundleScript}
      </body>
    </html>
  `);
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('REQ==', req);
  const error = new Error('Not Found');
  console.log(error);
  error.status = 404;
  res.send('Route not found');
  next(error);
});



module.exports = app;
