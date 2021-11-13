import React from 'react';
// import TMDB_image from '../TMDB/TMDB_image';
import './TempMediaTile.css';
import ProviderDisplay from './ProviderDisplay';


const TempMediaTile = ({ title, imgUrl, providers }) => (
  
  <div className="tmt-temp-tile mtc-tile">
    <span className="tmt-temp-label">{title}</span>
    <img className="poster_path" src={ imgUrl } />
    <ProviderDisplay providers={providers}/>
  </div>
);

export default TempMediaTile;