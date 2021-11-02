import React from 'react';
// import TMDB_image from '../TMDB/TMDB_image';
import './TempMediaTile.css';

const TempMediaTile = ({ title, imgUrl }) => (
  <div className="tmt-temp-tile mtc-tile">
    <span className="tmt-temp-label">{title}</span>
    <img src={ imgUrl } />
  </div>
);

export default TempMediaTile;