import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Landing from '../landing/Landing';
import Login from '../login/Login';
import GoogleOauthCBHandler from '../dataPrefetch/GoogleOauthCBHandler';

const DefaultRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/api/auth/google/callback" component={GoogleOauthCBHandler} />
        <Route path="/dashboard" component={redirLogin} />
    </Fragment>
);

const redirLogin = () => <Redirect to="/login" />;

export default DefaultRoutes;
