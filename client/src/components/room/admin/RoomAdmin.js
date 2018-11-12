import React, { Component } from 'react';
import { Radio, Settings, Users, BarChart2, MessageSquare } from 'react-feather';
import { materializeJS } from '../../../helpers/materialize';

import '../styles/admin.css';

import Activate from './Activate';
import Information from './settings/Information';

export default class RoomAdmin extends Component {
    constructor(props) {
        super(props);

        this.checkScreen = this.checkScreen.bind(this);
        this.state = {
            width: window.innerWidth || document.documentElement.clientWidt || document.body.clientWidth
        }
    }

    // initialize tabs and screen width listener
    componentDidMount() {
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});
        document.body.style.overflow = 'hidden';
        window.addEventListener('resize', this.checkScreen);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkScreen);
    }

    checkScreen() {
        const width = window.innerWidth || document.documentElement.clientWidt || document.body.clientWidth;
        this.setState({
            width: width
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div id="room-admin-cont">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab col s4">
                                    <a href="#room-activate-admin">
                                        {this.state.width <= 900 ? <Radio /> : 'Activate'}
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#room-statistics-admin">
                                        {this.state.width <= 900 ? <BarChart2 /> : 'Statistics'}
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#room-users-admin">
                                        {this.state.width <= 900 ? <Users /> : 'Users'}
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#room-announcements-admin">
                                        {this.state.width <= 900 ? <MessageSquare /> : 'Announcements'}
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a className="active" href="#room-settings-admin">
                                        {this.state.width <= 900 ? <Settings /> : 'Settings'}
                                    </a>
                                </li>
                            </ul>
                            <Activate />
                            <div id="room-statistics-admin" className="col s12">
                                <div className="room-admin">
                                    <h2>Activate Room</h2>
                                </div>
                            </div>
                            <div id="room-users-admin" className="col s12">
                                <div className="room-admin">
                                    <h2>Users</h2>
                                </div>
                            </div>
                            <div id="room-announcements-admin" className="col s12">
                                <div className="room-admin">
                                    <h1>test3</h1>
                                </div>
                            </div>
                            <Information />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
