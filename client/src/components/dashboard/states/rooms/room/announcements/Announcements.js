import React, { Component } from 'react';
import Announcement from './Announcement';

export default class Announcements extends Component {
    render() {
        return (
            <div id="room-announcements" className="col l8 m6 s12">
                <div id="announcements-cont">
                    <Announcement />
                    <Announcement />
                    <Announcement />
                </div>
            </div>
        )
    }
}
