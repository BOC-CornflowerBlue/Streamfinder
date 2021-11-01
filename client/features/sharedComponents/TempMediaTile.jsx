import React from 'react';
import TMDB_image from '../TMDB/TMDB_image';
import './TempMediaTile.css';

const TempMediaTile = ({ title, img_url }) => (
  <div className="tmt-temp-tile mtc-tile">
    <span className="tmt-temp-label">{title}</span>
    <img src={ img_url } />
  </div>
);

export default TempMediaTile;