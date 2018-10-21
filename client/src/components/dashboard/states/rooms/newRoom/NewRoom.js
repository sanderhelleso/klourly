import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';
import Form from './Form';
import { redirect } from '../../../../middelware/redirect';

import '../../styles/newRoom.css';

export default class NewRoom extends Component {

    componentWillMount() {
        document.title = 'Creating a new room - Klourly';
    }

    render() {
        return (
            <main className="container">
                <div id="new-room-back">
                    <a onClick={redirect.dashboard}><ArrowLeft /> back to dashboard</a>
                </div>
                <div className="row">
                    <div id="new-room-intro" className="center col s8 offset-s2">
                        <h1>Lets create a New Room</h1>
                        <p>A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.</p>
                        <div className="room-border"></div>
                    </div>
                </div>
                <div className="row">
                    <Form />
                </div>
            </main>
        )
    }
}
