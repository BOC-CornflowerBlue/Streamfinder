import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import data from '../features/home/tempHomeData';

import Auth from '../features/auth/Auth';
import SignIn from '../features/auth/SignIn';
import Home from '../features/home/Home';
import Search from '../features/search/Search';
import MediaDetail from '../features/media/MediaDetail';
import Account from '../features/accountPage/Account';
import ErrorBoundary from '../features/sharedComponents/ErrorBoundary';
import './Streamfinder.css';

class Streamfinder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isClient: false,
      message: 'hello user',
      buttonLabel: 'Hello',
    };
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
    const { buttonLabel, message, isClient } = this.state;
    return isClient ? (
      <Router>
        <div>
          <ul>
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

          <hr />

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
              <ErrorBoundary>
                <Search />
              </ErrorBoundary>
            </Route>
            <Route path="/media">
              <MediaDetail />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
          </Switch>
        </div>
      </Router>
    ) : (
     
      <Home />
    );
  }
}

export default Streamfinder;
