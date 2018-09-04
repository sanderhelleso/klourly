import React, { Component } from 'react';

// import Landing component
import Landing from './landing/Landing';

export default class App extends Component {
    render() {
        return (
            <div>
                <Landing />
                <h1>Hello World</h1>
            </div>
        )
    }
}
