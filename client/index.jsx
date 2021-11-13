import React from 'react';
import ReactDOM from 'react-dom';
import Streamfinder from './app/Streamfinder';
import axios from 'axios';
// import style from './style.css';

const sessionToken = window.localStorage.getItem('sessionToken');

if (sessionToken) {
  axios.post('/auth/verify', { token: sessionToken })
    .then(({ data: verifiedToken }) => {
      ReactDOM.render(
        <Streamfinder sessionToken={ verifiedToken } />,
        document.getElementById('Streamfinder')
      );
    })
    .catch(err => {
      console.log('No verification from server', err);
    });
} else {
  ReactDOM.render(
    <Streamfinder sessionToken={ sessionToken } />,
    document.getElementById('Streamfinder')
  );
}
