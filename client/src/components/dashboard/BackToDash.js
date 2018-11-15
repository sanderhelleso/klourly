import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';
import { redirect } from '../../helpers/redirect';

export default class BackToDash extends Component {
    render() {
        return (
            <div id="new-room-back">
                <a onClick={redirect.dashboard}><ArrowLeft /> back to dashboard</a>
            </div>
        )
    }
}
