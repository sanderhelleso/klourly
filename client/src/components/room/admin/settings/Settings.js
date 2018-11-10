import React, { Component } from 'react'

import Information from './Information';

export default class Settings extends Component {
    render() {
        return (
            <div id="room-settings-admin" className="col s12 animated fadeIn">
                <div className="room-admin">
                    <Information />
                </div>
            </div>
        )
    }
}
