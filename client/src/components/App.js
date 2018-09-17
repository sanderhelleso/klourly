import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
 
// import auth
import { authenticate } from './middelware/authenticated';

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

export default class App extends Component {

    componentWillMount() {
        authenticate();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing} />

                    <Route exact path="/signup" component={Signup} />
                </div>
            </BrowserRouter>
        )
    }
}
