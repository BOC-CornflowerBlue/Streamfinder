import React from 'react';
import ReactDOM from 'react-dom';
import Streamfinder from './app/Streamfinder';
import Auth from './features/auth/Auth';
import SignIn from './features/auth/SignIn';
import Home from './features/home/Home';
import Search from './features/search/Search';
import MediaDetail from './features/media/MediaDetail';
// import style from './style.css';

ReactDOM.render(
  <Streamfinder />,
  document.getElementById('Streamfinder')
);

