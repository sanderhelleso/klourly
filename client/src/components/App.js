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

    // authenticate user
    async componentWillMount() {
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.props.validateAction(await authentication.validateUser(user.id));
        }
    }

    // route for handling authentication on
    // auth required routes
    /*async authenticated() {
        await this.validate();
        if (this.props.state.loggedIn) {
            return <Dashboard />
        }

        return <Redirect to="/login" />
    }*/

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Landing} />

                    
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />


                    <Route path="/dashboard" component={Dashboard} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
     state: state
    };
};

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ validateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
