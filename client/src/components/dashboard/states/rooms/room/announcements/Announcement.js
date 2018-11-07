import React, { Component } from 'react';

export default class Announcement extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }
    render() {
        return (
            <div>
                <h1>THIS IS LIBARY</h1>
            </div>
        )
    }
}
