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
import NewAuth from '../features/auth/NewAuth';
import SignIn from '../features/auth/SignIn';
import CreateAccount from '../features/auth/CreateAccount';
import Login from '../features/auth/Login';
import Home from '../features/home/Home';
import Search from '../features/search/Search';
import MediaDetail from '../features/media/MediaDetail';
import Account from '../features/accountPage/Account';
import ErrorBoundary from '../features/sharedComponents/ErrorBoundary';
import './Streamfinder.css';
/* the idea:
upon auth being valid -
* auth will send username and current history ids (from user schema) to StreamerFinder
and state will bet set
* Each component can use component did update for when their props
change.  upon this happening they can make an ajax request to server
to pull data needed from MovieSchema
*/
class Streamfinder extends React.Component {
  constructor(props) {
    super(props);

    this.updateSession = this.updateSession.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.handleSearchIdSwitch = this.handleSearchIdSwitch.bind(this)

    this.cache = new Map();
    this.sessionToken = this.props.sessionToken || null;

    this.state = {
      sessionToken: this.props.sessionToken || null,
      //user establish because this is prior to auth being hooked up
      //this is under the impression auth was valid and currentId was sent
      //to this component and updated via component did update.
      currentId: 10138
    }
  }

  updateSession(token) {
    console.log(token);
    window.localStorage.setItem('sessionToken', 'fakehash');
    this.setState({ sessionToken: token });
  }

  checkCache(id) {
    return this.cache.get(id);
  }

  updateCache(id, data) {
    this.cache.set(id, data);
    this.state = {

    }
  }

  handleSearchIdSwitch(id) {
    //receives an id after search finishes retrieving new data
    //sets currentId resets currentID state with received Id
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
    const { updateSession, checkCache, updateCache } = this;

    return !sessionToken ? (
      <NewAuth updateSession={ updateSession } />
      ) : (
      <Router>
          <Switch>
            <Route exact path="/home">
              <Home checkCache={ checkCache } updateCache={ updateCache } currentId={this.state.currentId} />
            </Route>
            <Route path="/auth">
              <NewAuth updateSession={ updateSession } />
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
                //search prolly only needs to update most recent id searched
                <Search checkCache={ checkCache } updateCache={ updateCache } switch={this.handleSearchIdSwitch} />
              </ErrorBoundary>
            </Route>
            <Route path="/media">
              <MediaDetail checkCache={ checkCache } updateCache={ updateCache } />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/*">
              <Redirect to="/home" />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default Streamfinder;
