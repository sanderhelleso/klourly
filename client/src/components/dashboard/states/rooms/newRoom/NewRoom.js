import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';
import Stages from './Stages';
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
                    <Stages />
                </div>
            </main>
        )
    }
}
