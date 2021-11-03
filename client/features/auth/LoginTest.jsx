import React from 'react';
import axios from 'axios';

const LoginTest = props => {
  const handleClick = e => {
    axios.put('/login', {
      userName: 'stevek',
      password: 'password'
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return <button onClick={ handleClick }>Test Login</button>
};

export default LoginTest;
