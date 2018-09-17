import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { exampleAction } from '../actions/actions';
 
// import auth
import { authenticate } from './middelware/authenticated';

// import Landing component
import Landing from './landing/Landing';

// import Signup component
import Signup from './signup/Signup';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

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

const mapStateToProps = (state) => {
    return {
        examplePropOne: state.examplePropOne,
        examplePropTwo: state.examplePropTwo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
