import React from 'react';
import ReactDOM from 'react-dom';
import Streamfinder from './app/Streamfinder';
// import style from './style.css';

const sessionToken = window.localStorage.getItem('sessionToken');

ReactDOM.render(
  <Streamfinder sessionToken={ sessionToken } />,
  document.getElementById('Streamfinder')
);
