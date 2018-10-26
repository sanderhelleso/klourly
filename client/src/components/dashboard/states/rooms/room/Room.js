import React, { Component } from 'react';

import BackToDash from '../../../BackToDash';

export default class Room extends Component {
    render() {
        return (
            <div className="container">
                <BackToDash />
                <h1>This is a room</h1>
            </div>
        )
    }
}
