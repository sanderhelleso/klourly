import React, { Component } from 'react';
import { materializeJS } from '../../../../../../helpers/materialize';

import '../../styles/settings.css';

export default class RoomAdmin extends Component {
    constructor(props) {
        super(props);


    }

    // initialize tabs
    componentDidMount() {
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});
    }

    renderActivateRoom() {
        return (
            <div className="room-admin center-align">
                <h3>Activate Room</h3>
                <h5>The room will be active for authorized users <span>50M</span> around me</h5>
                <div>
                    <button 
                    id='checkin-btn' 
                    className="waves-effect waves-light btn animated fadeIn"
                    >
                    Activate
                    </button>
                </div>
                <a>Change activation settings?</a>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div id="room-admin-cont">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab col s4"><a className="active" href="#room-activate-admin">Activate</a></li>
                                <li className="tab col s4"><a href="#room-statistics-admin">Statistics</a></li>
                                <li className="tab col s4"><a href="#room-announcements-admin">Announcements</a></li>
                                <li className="tab col s4"><a href="#room-settings-admin">Settings</a></li>
                            </ul>
                            <div id="room-activate-admin" className="col s12 animated fadeIn">
                                {this.renderActivateRoom()}
                            </div>
                            <div id="room-statistics-admin" className="col s12 animated fadeIn">
                                <div className="room-admin">
                                    <h2>Activate Room</h2>
                                </div>
                            </div>
                            <div id="room-announcements-admin" className="col s12 animated fadeIn">
                                <div className="room-admin">
                                    <h1>test3</h1>
                                </div>
                            </div>
                            <div id="room-settings-admin" className="col s12 animated fadeIn">
                                <div className="room-admin">
                                    <h1>test4</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
