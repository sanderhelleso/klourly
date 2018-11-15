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
import { redirect } from './middelware/redirect';

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

    login() {
        return <Redirect to="/login" />
    }

    renderRoutes() {

        if (this.props.state.auth.loggedIn) {
            return (
                <div id="main-app-cont">
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/signup" component={Dashboard} />
                    <Route exact path="/login" component={redirect.dashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/new-room" component={NewRoom} />
                    <Route exact path="/dashboard/rooms/:id" component={Room} />
                    <Route exact path="/dashboard/rooms/:roomID/admin" component={RoomAdmin} />
                    <Route exact path="/dashboard/rooms/:roomID/announcements/:postID" component={Announcement} />

                    <Route exact path="/join-room/:timestamp/:roomID" component={JoinRoom} />
                </div>
            )
        }

        else {
            return (
                <div id="main-app-cont">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/dashboard" component={redirect.login()} />
                </div>
            )
        }
    }

    render() {
        return (
            <Router history={history}>
                {this.renderRoutes()}
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
