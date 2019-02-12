import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import UserLocation from '../dataPrefetch/UserLocation';
import ActiveRoomsData from '../dataPrefetch/ActiveRoomsData';
import Messaging from '../messaging/Messaging';
import RoomData from '../dataPrefetch/RoomData';
import CheckinAvailableData from '../dataPrefetch/CheckinAvailableData';
import NotificationsData from '../dataPrefetch/NotificationsData';
import NewRoom from '../newRoom/NewRoom';
import Dashboard from '../dashboard/Dashboard';

import RoomRoutes from './RoomRotues';

const LoggedInRoutes = includeRoom => (
    <Fragment>
        {includeRoom ? <RoomRoutes /> : null}
        <Route exact path="/" component={this.landingRoute} />
        <Route exact path="/signup" component={this.signupRoute} />
        <Route exact path="/login" component={this.loginRoute} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/new-room" component={NewRoom} />
        <Route path="/dashboard/rooms/:roomID" component={RoomData} />
        <Messaging />
        <UserLocation />
        <NotificationsData />
        <CheckinAvailableData />
        <ActiveRoomsData />
    </Fragment>
);

export default LoggedInRoutes;
