import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from "react-router-dom";

import { authentication } from './middelware/authentication';

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

// import Login component
import Login from './login/Login';

// import Dashboard
import Dashboard from './dashboard/Dashboard';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: null
        }       
    }

    componentDidMount() {
        const auth = authentication.validateUser()
        .then((data) => {
            this.setState({
                authenticated: data
            });
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing} />


                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />


                        authentication.validateUser() ? (
                            <Dashboard />
                        ) : (
                          <Redirect to="/login"/>
                        )
                      )}/>

                        // authenticted for route
                        else {
                            return <Dashboard />
                        }
                    }} />
                </div>
            </BrowserRouter>
        )
    }
}
