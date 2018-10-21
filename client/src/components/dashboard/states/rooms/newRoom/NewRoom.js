import React, { Component } from 'react';
import Form from './Form';

export default class NewRoom extends Component {
    render() {
        return (
            <main className="container">
                <div>
                    <a>Back to dashboard</a>
                </div>
                <div>
                    <h1>New Room</h1>
                    <p>Lets create a new room</p>
                </div>
                <Form />
            </main>
        )
    }
}
