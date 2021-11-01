import { Route } from 'react-router';
import React from 'react';

import Streamfinder from '../../client/app/Streamfinder';
import Auth from '../../client/features/auth/Auth';
import Home from '../../client/features/home/Home';
import Search from '../../client/features/search/Search';
import MediaDetail from '../../client/features/media/MediaDetail';

export default (
  <Route name="app" path="/" component={Streamfinder}>
    <Route path="auth" component={Auth} />
    <Route path="home" component={Home} />
    <Route path="search" component={Search} />
    <Route path="media" component={MediaDetail} />
    <Route path="*" component={error404}/>
  </Route>
);
