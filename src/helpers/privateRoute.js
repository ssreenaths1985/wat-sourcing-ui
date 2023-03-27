import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { APP } from './../constants/appConstants';

const PrivateRoute = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (AuthService.isLogin() ? <Component {...props} /> : <Redirect to= {APP.ROUTER_PATH.LOGIN} />)} />
)
export default PrivateRoute;