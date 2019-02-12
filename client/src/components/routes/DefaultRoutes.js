import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Landing from '../landing/Landing';
import Signup from '../signup/Signup';
import Login from '../login/Login';

const DefaultRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={redirLogin} />
    </Fragment>
);

const redirLogin = () => <Redirect to="/login" />;

export default DefaultRoutes;
