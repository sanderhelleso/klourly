import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";

import { authentication } from './middelware/authentication';

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

// import Login component
import Login from './login/Login';

// import Dashboard
import Dashboard from './dashboard/Dashboard';

class App extends Component {

    /*componentDidMount() {
        const auth = authentication.validateUser()
        .then((data) => {
            this.setState({
                authenticated: data
            });
        });
    }*/

    // route for handling authentication on
    // auth required routes
    authenticated() {
         console.log(this.props.state);
         if (this.props.state.loggedIn) {
            return <Dashboard />
        }

        return <Redirect to="/login" />
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing} />

                    
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />


                    <Route path="/dashboard" render={() => {return this.authenticated() }} />
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
     state: state.state
    };
};

export default connect(mapStateToProps)(App);
