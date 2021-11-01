const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./auth/session/sessionController.js');
const path = require('path');
const cors = require('cors');
const {db} = require('./database/database');
const clientBundleScript = '<script src="http://localhost:8080/scripts/bundle.js"></script>';
const clientBundleStyle = '<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">';
// const routes = require('./routes');

const app = express();

// app.use(cors());
// require('./cacheManager');
// parse application/json
app.use(cookieParser());
app.use(auth.createSession);
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'staticAssets')));

app.get('/*', (req, res, next) => {
  // const jsx = ReactDOMServer.renderToString(<Auth />);

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
// routes(app);

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