import React, { Fragment, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserLocation from '../dataPrefetch/UserLocation';
import ActiveRoomsData from '../dataPrefetch/ActiveRoomsData';
import Messaging from '../messaging/Messaging';
import CheckinAvailableData from '../dataPrefetch/CheckinAvailableData';
import NotificationsData from '../dataPrefetch/NotificationsData';
import NewRoom from '../newRoom/NewRoom';
import Dashboard from '../dashboard/Dashboard';
import RoomRoutes from './RoomRotues';
import RoomData from '../dataPrefetch/RoomData';

class LoggedInRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                {this.props.includeRoom ? <RoomRoutes /> : null}
                <Route path="/dashboard/rooms/:roomID" component={RoomData} />
                <Route exact path="/" component={landingRoute} />
                <Route exact path="/login" component={landingRoute} />
                <Route exact path="/api/auth/google/callback" component={landingRoute} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/new-room" component={NewRoom} />
                <Messaging />
                <UserLocation />
                <NotificationsData />
                <CheckinAvailableData />
                <ActiveRoomsData />
            </Fragment>
        )
    }
};

// route for handling authentication on auth required routes
const landingRoute = () => <Redirect to="/dashboard" />;

export default LoggedInRoutes;
