import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Streamfinder from '../../app/Streamfinder';
import axios from 'axios';
import './signIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit() {
    axios.post('/login', this.state)
    .then(({ data }) => {
      console.log('Response from /login:', data);
    })
    .catch((err) => {
      console.log('/login Err', err);
    })
  }

  handleKeyPress(e) {
    e.key === 'Enter' && this.handleSubmit();
  }

  render() {
    return (
      <div className="signInPage" onKeyPress={this.handleKeyPress} >
      <h1 className="signInHeader">Sign In</h1>
      <div className="signIn-username">
        <input autoFocus type="text" id="username" placeholder="Username" onChange={this.handleChange}></input>
      </div>
      <div className="signIn-password">
        <input type="password" id="password" placeholder="Password" onChange={this.handleChange}></input>
      </div>
      <button onClick={this.handleSubmit}>Sign in</button>
      <div className="signIn-signInLink">
        <div><Link to="/auth">New to Streamfinder? Sign up now!</Link></div>
      </div>
    </div>
    )
  }
};

export default SignIn;