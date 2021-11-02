'use strict';
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`;
const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`;
const { getMovie } = require('./homeDB')
const {default: Streamfinder} = require('../../client/app/Streamfinder')

const {
  sendErrorResponse,
  sendResponse
} = require("../helpers");


exports.getHomeInfo = (req, res, next) => {
  let movie = getMovie()
  movie.then((movieData) => {
   
    if (movieData.length) {
      res.send(movieData[0])
    }
   })
}