import React, { Component } from 'react';
import Form from './Form';
import { redirect } from '../../../../middelware/redirect';

export default class NewRoom extends Component {

    componentWillMount() {
        document.title = 'Creating a new room - Klourly';
    }

    render() {
        return (
            <main className="container">
                <div>
                    <a onClick={redirect.dashboard}>Back to dashboard</a>
                </div>
                <div className="center">
                    <h1>Lets create a New Room</h1>
                    <p>A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.</p>
                </div>
                <div className="row">
                    <Form />
                </div>
            </main>
        )
    }
}
