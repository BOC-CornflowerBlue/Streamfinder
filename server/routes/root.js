'use strict';

const router = require('express').Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
// const {default: Streamfinder} = require('../../client/app/Streamfinder.jsx');
require('dotenv').config();
const {db} = require('../database/database');
const clientBundleScript = '<script src="http://localhost:8080/scripts/bundle.js"></script>';
const clientBundleStyle = '<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">';
router.get('*', (req, res) => {
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

module.exports = router;