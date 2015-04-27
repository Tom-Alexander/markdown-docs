import App from './App';
import React from 'react';
import AppRouteHandler from './AppRouteHandler';
import NotFound from './NotFound';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
var {Component} = React;

var DirectoryRoutes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={AppRouteHandler} />
    <Route handler={AppRouteHandler} path="*"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default DirectoryRoutes;
