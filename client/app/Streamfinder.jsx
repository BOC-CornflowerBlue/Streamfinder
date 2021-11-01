import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Auth from '../features/auth/Auth';
import SignIn from '../features/auth/SignIn';
import Home from '../features/home/Home';
import Search from '../features/search/Search';
import MediaDetail from '../features/media/MediaDetail';
import Account from '../features/accountPage/Account';
import './Streamfinder.css';

class Streamfinder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.cache = {
      media: new Map()
    };

    this.state = {
      showNavBar: true
    };
  }

  checkCache(cacheName, itemId) {
    return this.cache[cacheName].get(itemId);
  }

  updateCache(cacheName, itemId, data) {
    this.cache[cacheName].set(itemId, data);
  }

  handleClick(e) {
    if (this.state.message.length) {
      this.setState({ message: '', buttonLabel: '' });
      alert('Introduction completed');
    }
  }

  componentDidMount() {
    if (!this.state.isClient) {
      this.setState({ isClient: true });
    }
  }

  render() {
    return (
      <Router>
        { this.state.showNavBar ? (
          <ul className="streamfinder-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Auth</Link>
            </li>
            <li>
              <Link to="/signIn">SignIn</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/media">Media</Link>
            </li>
            <li>
              <Link to="/account">User</Link>
            </li>
          </ul>
        ) : null }

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/media">
            <MediaDetail />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Streamfinder;
