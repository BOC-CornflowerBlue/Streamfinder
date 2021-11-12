/*
IMPORTANT NOTE ABOUT NEW AUTH RESTRICTIONS:
Navigating to /auth will erase your surrent session
This is so that you have an easy way to erase your session if you want to test the route restrictions

BUT THERE IS A SIDE-EFFECT:
For now, if you navigate to /auth you will be redirected to login indefinitely until you navigate somewhere else
To erase your session and get a new one, navigate to auth, then to one of the normal routes, THEN enter dummy login credentials
*/

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Auth from '../features/auth/Auth';
import CreateAccount from '../features/auth/CreateAccount';
import Login from '../features/auth/Login';
import Home from '../features/home/Home';
import Search from '../features/search/Search';
import MediaDetail from '../features/media/MediaDetail';
import Account from '../features/accountPage/Account';
import ErrorBoundary from '../features/sharedComponents/ErrorBoundary';
import './Streamfinder.css';

class Streamfinder extends React.Component {
  constructor(props) {
    super(props);

    this.sessionExpired = this.sessionExpired.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);

    this.cache = new Map();
    this.sessionToken = this.props.sessionToken || null;

    this.state = {
      sessionToken: this.props.sessionToken || null,
    };
  }

  updateSession(username) {
    if (!username) {
      window.localStorage.removeItem('sessionToken');
      this.setState({ sessionToken: null });
    } else {
      const sessionToken = btoa(`{"username": "${username}", "date": ${new Date().getTime()}}`);
      window.localStorage.setItem('sessionToken', sessionToken);
      this.setState({ sessionToken });
      return sessionToken;
    }
  }

  sessionExpired() {
    // Checks expiration date decoded from sessionToken
    if (this.state.sessionToken) {
      const expiredTime = (new Date().getTime() - JSON.parse(atob(this.state.sessionToken)).date) / 1000;
      if (expiredTime > 7776000) {
        alert('Session expired. Please sign in to continue.');
        return true;
      } else {
        let expiration;
        const daysRemaining = Number.parseFloat((7776000 - expiredTime) / 86400).toPrecision(2);
        if (daysRemaining < 1) {
          expiration = `less than ${Number.parseFloat(daysRemaining * 24).toPrecision(2)} hours`;
        } else {
          expiration = daysRemaining + ' days';
        }
        console.log(`Session expires in ${expiration}`);
        return false;
      }
    }
    return true;
  }

  currentUser(sessionToken = window.localStorage.getItem('sessionToken')) {
    // Returns username decoded from sessionToken
    if (sessionToken) {
      const username = JSON.parse(atob(sessionToken)).username;
      return username;
    }
  }

  checkCache(id) {
    return this.cache.get(id);
  }

  updateCache(id, data) {
    this.cache.set(id, data);
  }

  // componentDidMount() {
  //   const token = window.localStorage.getItem('sessionToken');
  //   if (token !== this.sessionToken) {
  //     this.sessionToken = token;
  //     this.setState({ sessionToken: token });
  //   }
  // }

  render() {
    const { sessionToken } = this.state;
    const { currentUser, sessionExpired, updateSession, checkCache, updateCache } = this;

    return sessionExpired() ? (
      <Auth updateSession={ updateSession } />
      ) : (
      <Router>
          <Switch>
            <Route exact path="/home">
              <Home currentUser={currentUser} updateSession={updateSession} />
            </Route>
            <Route path="/auth">
              <Auth updateSession={ updateSession } />
            </Route>
            {/* <Route exact path="/signIn">
              <SignIn updateSession={ updateSession } />
            </Route>
            <Route path="/createAccount">
              <CreateAccount updateSession={ updateSession } />
            </Route>
            <Route exact path="/login">
              <Login updateSession={ updateSession } />
            </Route> */}
          <Route path="/search">
            <ErrorBoundary>
              {/* //search prolly only needs to update most recent id searched */}
              <Search checkCache={checkCache} updateCache={updateCache} switch={this.handleSearchIdSwitch} />
            </ErrorBoundary>
          </Route>
          <Route path="/media">
            <MediaDetail checkCache={checkCache} updateCache={updateCache} currentUser={currentUser}/>
          </Route>
          <Route path="/account">
            <Account updateSession={updateSession} />
          </Route>
          <Route exact path="/*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Streamfinder;
