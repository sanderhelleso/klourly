import React, { Component } from 'react';
import Announcement from './Announcement';

export default class Announcements extends Component {
    render() {
        return (
            <div id="room-announcements" className="col s8">
                <div id="announcements-cont">
                    <Announcement />
                    <Announcement />
                    <Announcement />
                </div>
            </div>
        )
    }
}
