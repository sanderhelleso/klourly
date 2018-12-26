import React, { Component } from 'react';
import Stages from './stages/Stages';

import './styles/newRoom.css';

export default class NewRoom extends Component {

    render() {
        return (
            <main className="container">
                <Stages />
            </main>
        )
    }
}