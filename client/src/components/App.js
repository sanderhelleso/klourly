import React, { Component } from 'react';
import { Router, Route, Redirect} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import history from '../helpers/history';
import * as firebase from 'firebase';
import { ToastContainer, Flip, Fade } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// impoort animate and materialize
import 'animate.css';
import 'materialize-css/dist/css/materialize.min.css';

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
import RoomCheckin from './room/admin/checkin/RoomCheckin';
import Reports from './room/admin/reports/Reports';

// data fetchers
import RoomData from './dataPrefetch/RoomData';
import ReportData from './dataPrefetch/ReportData';
import UserLocation from './dataPrefetch/UserLocation';
import ActiveRoomsData from './dataPrefetch/ActiveRoomsData';
import Messaging from './messaging/Messaging';
import CheckinReport from './room/admin/reports/checkin/CheckinReport';
import MemberReport from './room/admin/reports/member/MemberReport';

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
                    <Route exact path="/dashboard/rooms/:roomID/admin/reports" component={Reports} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/members" component={RoomMembers} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/checkin" component={RoomCheckin} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/announcements" component={RoomAnnouncements} />
                    <Route exact path="/dashboard/rooms/:roomID/announcements/:announcementID" component={Announcement} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/reports/checkin/:checkinID" component={CheckinReport} />
                    <Route exact path="/dashboard/rooms/:roomID/admin/reports/member/:memberID" component={MemberReport} />
                    <Route path="/dashboard/rooms/:roomID/admin/reports" component={ReportData} />
                </div>
            )
        }

        return null;
    }

    renderRoutes() {

        if (this.props.auth.loggedIn === null) return null;

        else if (this.props.auth.loggedIn) {
            return (
                <div>
                    {this.renderRoomRoutes()}
                    <Route exact path="/" component={this.landingRoute} />
                    <Route exact path="/signup" component={this.signupRoute} />
                    <Route exact path="/login" component={this.loginRoute} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/new-room" component={NewRoom} />
                    <Route path="/dashboard/rooms/:roomID" component={RoomData} />
                    <Messaging />
                    <UserLocation />
                    <ActiveRoomsData />
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
                    <ToastContainer transition={Fade} closeButton={false} />
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

    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400');


    * {
        font-family: 'Open Sans', sans-serif;
    }

    body {
        background-color: #f5f5f5;
        overflow-x: hidden !important;
    }

    /* class for text not to be selected or focused */
    .no-select {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    }

    a {
        cursor: pointer;
    }

    .toast-error {
        background-color: #e53935 !important;
        color: #ffcdd2 !important;
        font-size: 0.95rem !important;
        text-align: center !important;
        font-weight: 400;
    }

    .error-progress-bar {
        background: #ffcdd2 !important;
        max-height: 2px;
    }

    .toast-success {
        background-color: #66bb6a !important;
        color: #ffffff !important;
        font-size: 0.95rem !important;
        text-align: center !important;
        font-weight: 400;
    }

    .success-progress-bar {
        background: #ffffff !important;
        max-height: 2px;
    }

    .redirecting {
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%);
        text-align: center;
        font-size: 1rem;
        font-weight: 100;
        color: #9e9e9e;
    }

    .linear-loader-cont .progress {
        max-width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
    }

    .progress {
        background-color: #eeeeee !important;
    }

    .progress .indeterminate {
        background-color: #7c4dff !important;   
    }

    .login-loader-cont {
        opacity: 0.5 !important;
        max-width: 85%;
        margin: 0 auto;
    }

    .login-loader-cont .indeterminate {
        background-color: #b388ff !important;
    }

    [type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:before, [type="radio"].with-gap:checked+span:after {
        border: 2px solid #b388ff !important;
    }

    [type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:after {
        background-color: #b388ff !important;
    }

    input:focus, textarea:focus {
        border-bottom: 1px solid #b388ff !important;
        box-shadow: 0 1px 0 0 #b388ff !important;
    }
    
    input:focus + label, textarea:focus + label {
        color: #b388ff !important;
    }

    input[type="checkbox"]:checked+span:not(.lever):before {
        border-right: 2px solid #b388ff;
        border-bottom: 2px solid #b388ff;
    }

    ::-webkit-scrollbar {
        width: 0.65em;
    }
    
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #e0e0e0;
        outline: 1px solid #9e9e9e;
    }

    .room-option {
        transition: 0.3s ease-in-out;
        outline: none;
    }

    .room-option:focus {
        opacity: 1;
        -webkit-box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
        box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
    }
`;
