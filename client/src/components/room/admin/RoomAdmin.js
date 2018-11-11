import React, { Component } from 'react';
import { materializeJS } from '../../../helpers/materialize';

import '../styles/admin.css';

import Activate from './Activate';
import Settings from './settings/Settings';

export default class RoomAdmin extends Component {
    constructor(props) {
        super(props);

    }

    // initialize tabs
    componentDidMount() {
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div id="room-admin-cont">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab col s4"><a href="#room-activate-admin">Activate</a></li>
                                <li className="tab col s4"><a href="#room-statistics-admin">Statistics</a></li>
                                <li className="tab col s4"><a href="#room-announcements-admin">Announcements</a></li>
                                <li className="tab col s4"><a className="active" href="#room-settings-admin">Settings</a></li>
                            </ul>
                            <Activate />
                            <div id="room-statistics-admin" className="col s12">
                                <div className="room-admin">
                                    <h2>Activate Room</h2>
                                </div>
                            </div>
                            <div id="room-announcements-admin" className="col s12">
                                <div className="room-admin">
                                    <h1>test3</h1>
                                </div>
                            </div>
                            <Settings />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
