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

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

// import Login component
import Login from './login/Login';

// import Dashboard
import Dashboard from './dashboard/Dashboard';
import MainNav from './navigation/main/MainNav';

class App extends Component {
    constructor(props) {
        super(props);

        this.landingRoute = this.landingRoute.bind(this);
        this.loginRoute = this.loginRoute.bind(this);
        this.signupRoute = this.signupRoute.bind(this);
        this.dashboardRoute = this.dashboardRoute.bind(this);
    }

    // authenticate user
    async componentWillMount() {
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.props.validateAction(await authentication.validateUser(user.id));
        }
    }

    // route for handling authentication on auth required routes
    loginRoute() {
        return this.props.state.loggedIn ? <Redirect to="/dashboard" /> : <Login />;
    }

    signupRoute() {
        return this.props.state.loggedIn ? <Redirect to="/dashboard" /> : <Signup />;
    }

    landingRoute() {
        return this.props.state.loggedIn ? <Redirect to="/dashboard" /> : <Landing />;
    }

    dashboardRoute() {
        return this.props.state.loggedIn ? <Dashboard /> : <Redirect to="/" />;
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={this.landingRoute} />
                    <Route exact path="/signup" component={this.signupRoute} />
                    <Route exact path="/login" component={this.loginRoute} />
                    <Route path="/dashboard" component={this.dashboardRoute} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
     state: state.state
    };
};

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ validateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
