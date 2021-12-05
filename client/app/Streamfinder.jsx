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
  Redirect
} from 'react-router-dom';
import axios from 'axios';

import { Logger } from '../../logger.js';

import NavBar from '../features/sharedComponents/NavBar';
import Auth from '../features/auth/Auth';
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
    this.handleSearch = this.handleSearch.bind(this);

    this.cache = new Map();
    this.sessionToken = this.props.sessionToken || null;

    this.state = {
      sessionToken: this.props.sessionToken || null,
      searchResults: []
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
    if (this.state.sessionToken) {
      let expiredTime;
      let badToken = false;
      try {
        const decodedSessionToken = atob(this.state.sessionToken);
        const jsonSessionToken = JSON.parse(decodedSessionToken);
        const sessionTokenDate = jsonSessionToken.date;

        expiredTime = (new Date().getTime() - sessionTokenDate) / 1000;
      }
      catch {
        Logger.consoleLog('Bad session token ¯\\_(ツ)_/¯');
        badToken = true;
      }
      finally {
        if (expiredTime > 7776000 || badToken) {
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
          Logger.consoleLog(`Session expires in ${expiration}`);
          return false;
        }
      }
    }
    return true;
  }

  currentUser(sessionToken = window.localStorage.getItem('sessionToken')) {
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

  handleSearch(searchTerm, onSearch) {
    return new Promise((resolve, reject) => {
      searchTerm && onSearch && onSearch(searchTerm);

      Logger.consoleLog('handleSearch');
      Logger.consoleLog('searchTerm: ', searchTerm);

      axios.post('/search/searchPost', {
        title: encodeURI(searchTerm),
        user:'lil timmy'
      })
      .then(({data}) => {
        Logger.consoleLog('searchResults: ', data);
        this.setState({
          searchResults: data,
        });
        resolve();
      })
      .catch(error => {
        Logger.consoleLog('handleSearch error: ', error);
        reject(error);
      })
      // TODO: If successful, re-route to search results page?
      // TODO: Add error handling. Empty searchDisplay?
    });
  }

  render() {
    const {
      currentUser,
      sessionExpired,
      updateSession,
      checkCache,
      updateCache,
      handleSearch } = this;

      const searchResults = this.state.searchResults;

    return sessionExpired() ? (
      <Auth updateSession={ updateSession } />
      ) : (
      <>
      <Router>
        <Switch>
          <Route exact path="/home">
            <ErrorBoundary>
              <NavBar updateSession={ updateSession } handleSearch={ handleSearch } displaySearch={ true }/>
              <Home updateSession={ updateSession } currentUser={ currentUser } />
            </ErrorBoundary>
          </Route>
          <Route path="/auth">
            <ErrorBoundary>
              <NavBar updateSession={ updateSession } handleSearch={ handleSearch } displaySearch={ false }/>
              <Auth updateSession={ updateSession } />
            </ErrorBoundary>
          </Route>
          <Route path="/search">
            <ErrorBoundary>
              <NavBar updateSession={ updateSession } handleSearch={ handleSearch } displaySearch={ true }/>
              <Search
                searchResults={ searchResults }
              />
            </ErrorBoundary>
          </Route>
          <Route path="/media">
            <ErrorBoundary>
              <NavBar updateSession={ updateSession } handleSearch={ handleSearch } displaySearch={ true }/>
              <MediaDetail updateSession={ updateSession } checkCache={ checkCache } updateCache={ updateCache } />
            </ErrorBoundary>
          </Route>
          <Route path="/account">
            <ErrorBoundary>
              <NavBar updateSession={ updateSession } handleSearch={ handleSearch } displaySearch={ false }/>
              <Account updateSession={ updateSession } />
            </ErrorBoundary>
          </Route>
          <Route exact path="/*">
            <ErrorBoundary>
              <Redirect to="/home" />
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
      </>
    );
  }
}

export default Streamfinder;
