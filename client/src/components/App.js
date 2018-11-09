import React, { Component } from 'react';
import { Router, Route, Redirect} from "react-router-dom";
import history from './middelware/history';

// animations
import 'animate.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authentication } from './middelware/authentication';
import { validateAction } from '../actions/validateActions';

import Landing from './landing/Landing';
import Signup from './signup/Signup';
import Login from './login/Login';
import NewRoom from './dashboard/states/rooms/newRoom/NewRoom';
import Room from './room/Room';
import RoomAdmin from './room/admin/RoomAdmin';

// import Dashboard
import Dashboard from './dashboard/Dashboard';
import MainNav from './navigation/main/MainNav';
import JoinRoom from './joinRoom/JoinRoom';
import Announcement from './room/announcements/Announcement';

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
        if (localStorage.getItem('user') !== null && localStorage.getItem('userData') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.props.validateAction(authentication.validateUser(user.id)); // set logged in (true / false)
        }
    }

    // route for handling authentication on auth required routes
    loginRoute() {
        return this.props.state.auth.loggedIn ? <Redirect to="/dashboard" /> : <Login />;
    }

    signupRoute() {
        return this.props.state.auth.loggedIn ? <Redirect to="/dashboard" /> : <Signup />;
    }

    landingRoute() {
        return this.props.state.auth.loggedIn ? <Redirect to="/dashboard" /> : <Landing />;
    }

    dashboardRoute() {
        return this.props.state.auth.loggedIn ? <Dashboard /> : <Redirect to="/" />;
    }

    roomRoute() {
        return this.props.state.auth.loggedIn ? <Room /> : <Redirect to="/" />;
    }

    render() {
        return (
            <Router history={history}>
                <div id="main-app-cont">
                    <Route exact path="/" component={this.landingRoute} />
                    <Route exact path="/signup" component={this.signupRoute} />
                    <Route exact path="/login" component={this.loginRoute} />
                    <Route exact path="/dashboard" component={this.dashboardRoute} />
                    <Route exact path="/dashboard/new-room" component={NewRoom} />
                    <Route exact path="/dashboard/rooms/:id" component={Room} />
                    <Route exact path="/dashboard/rooms/:roomID/admin" component={RoomAdmin} />
                    <Route exact path="/dashboard/rooms/:roomID/announcements/:postID" component={Announcement} />

                    <Route exact path="/join-room/*/*" component={JoinRoom} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ validateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
