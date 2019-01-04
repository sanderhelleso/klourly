import React, { Component } from 'react';
import { Router, Route, Redirect} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import history from '../helpers/history';
import * as firebase from 'firebase';

// animations
import 'animate.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authentication } from '../api/authentication/authentication';
import { validateAction } from '../actions/validateActions';

import Landing from './landing/Landing';
import Signup from './signup/Signup';
import Login from './login/Login';
import NewRoom from './newRoom/NewRoom';
import Room from './room/Room';
import RoomAdmin from './room/admin/RoomAdmin';
import NotFound from './notFound/NotFound';

// import Dashboard
import Dashboard from './dashboard/Dashboard';
import JoinRoom from './joinRoom/JoinRoom';
import Announcement from './room/announcements/Announcement';
import RoomAnnouncements from './room/admin/announcements/RoomAnnouncements';
import RoomMembers from './room/admin/members/RoomMembers';
import RoomData from './dataPrefetch/RoomData';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCS-DuAW0EyzWL3zHe_eVwMcHWqBvnIOHg",
    authDomain: "klourly-44ba2.firebaseapp.com",
    databaseURL: "https://klourly-44ba2.firebaseio.com",
    projectId: "klourly-44ba2",
    storageBucket: "klourly-44ba2.appspot.com",
    messagingSenderId: "737898303857"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);

        this.landingRoute = this.landingRoute.bind(this);
        this.loginRoute = this.loginRoute.bind(this);
        this.signupRoute = this.signupRoute.bind(this);
        this.dashboardRoute = this.dashboardRoute.bind(this);
        this.roomRoute = this.roomRoute.bind(this);
    }

    // authenticate user
    componentWillMount() {
        this.validateUser();
    }

    async validateUser() {
        const user = localStorage.getItem('user');
        if (user !== null) {
            const auth = await authentication.validateUser(JSON.parse(user).id);
            console.log(auth);
            this.props.validateAction(auth);
        }

        else {
            this.props.validateAction(false);
        }
    }

    // route for handling authentication on auth required routes
    loginRoute() {
        return this.props.auth.loggedIn ? <Redirect to="/dashboard" /> : <Login />;
    }

    signupRoute() {
        return this.props.auth.loggedIn ? <Redirect to="/dashboard" /> : <Signup />;
    }

    landingRoute() {
        return this.props.auth.loggedIn ? <Redirect to="/dashboard" /> : <Landing />;
    }

    dashboardRoute() {
        return this.props.auth.loggedIn ? <Dashboard /> : <Redirect to="/" />;
    }

    roomRoute() {
        return this.props.auth.loggedIn ? <Room /> : <Redirect to="/" />;
    }

    login() {
        return <Redirect to="/login" />
    }

    renderRoomRoutes() {
        if (this.props.room.activeRoom) {
            return (
                <div>
                    <Route exact path="/dashboard/rooms/:roomID" component={Room} />
                    <Route exact path="/dashboard/rooms/:roomID/admin" component={RoomAdmin} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/members" component={RoomMembers} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/announcements" component={RoomAnnouncements} />
                    <Route exact path="/dashboard/rooms/:roomID/announcements/:announcementID" component={Announcement} />
                </div>
            )
        }

        return null;
    }

    renderRoutes() {

        if (this.props.auth.loggedIn === null) {
            return null;
        }

        else if (this.props.auth.loggedIn) {
            return (
                <div>
                    <Route exact path="/" component={this.landingRoute} />
                    <Route exact path="/signup" component={this.signupRoute} />
                    <Route exact path="/login" component={this.loginRoute} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/new-room" component={NewRoom} />
                    <Route path="/dashboard/rooms/:roomID" component={RoomData} />
                    {this.renderRoomRoutes()}
                </div>
            )
        }

        else {
            return (
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/dashboard" component={this.login} />
                </div>
            )
        }
    }

    render() {
        return (
            <Router history={history}>
                <div id="main-app-cont">
                    <GlobalDashStyle />
                    {this.renderRoutes()}
                    <Route exact path="/join-room/:inviteID/:roomID" component={JoinRoom} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return { ...state };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ validateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const GlobalDashStyle = createGlobalStyle`
    body {
        background-color: #f5f5f5;
    }
`;
