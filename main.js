import React from 'react';
import ReactDOM from 'react-dom';

import App from './client/components/App.jsx';
import Login from './client/components/Login.jsx';
import RegisterForm from './client/components/RegisterForm.jsx';
import Logout from './client/components/logout.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path={"/"} component={Login}/>
    <Route path={"/bloggerPage"} component={App}/>
    <Route path={"/Logout"} component={Logout}/>
    <Route path={"/register"} component={RegisterForm} />
  </Router>
  , document.getElementById('app'));
