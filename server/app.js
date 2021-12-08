const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());

app.disable('x-powered-by');

const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const suggestedRouter = require('./routes/suggested');
const authorizationRouter = require('./routes/auth');
const mediaDetailRouter = require('./routes/mediaDetail');
const reviewsRouter = require('./routes/reviews');

require('dotenv').config();
const clientBundleScript = '<script src="http://localhost:8080/scripts/bundle.js"></script>';
const clientBundleStyle = '<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">';

const { Logger } = require('../logger.js');

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'staticAssets')));

app.use('/home', homeRouter);
app.use('/search', searchRouter);
app.use('/suggested', suggestedRouter);
app.use('/auth', authorizationRouter);
app.use('/media', mediaDetailRouter);
app.use('/reviews', reviewsRouter);

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streamfinder</title>
        ${clientBundleStyle}
        <link rel="icon" href="data:,">
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
	Logger.consoleLog('REQ==', req)
	const error = new Error('Not Found')
	Logger.consoleLog(error)
	error.status = 404
	res.send('Route not found')
	next(error)
});

module.exports = app;