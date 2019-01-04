import React, { Component } from 'react';
import Activate from './Activate';
import BackToRoom from '../../BackToRoom';

export default class AdminCheckin extends Component {
    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <h1>Administrate Checkin</h1>
                    <Activate />
                </div>
            </main>
        )
    }
}
