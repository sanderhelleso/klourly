import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

// import Login component
import Login from './login/Login';

// import Dashboard
import Dashboard from './dashboard/Dashboard';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing} />


                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />


                    <Route exact path="/dashboard" component={Dashboard} />
                </div>
            </BrowserRouter>
        )
    }
}
