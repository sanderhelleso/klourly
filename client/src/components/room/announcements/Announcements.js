import React, { Component } from 'react';
import AnnouncementPreview from './AnnouncementPreview';

export default class Announcements extends Component {
    constructor(props) {
        super(props);

    }

    renderAnnouncements() {
        
        if (this.props.announcements) {
            return Object.entries(this.props.announcements).map(announcement => {
                return (
                    <AnnouncementPreview
                        key={announcement[0]}
                        id={announcement[0]}
                        data={announcement[1]} 
                    />
                )
            });
        }

        return <p>No announcements has been posted in this room</p>
    }

    render() {
        return (
            <div id="room-announcements">
                <h2>Announcements</h2>
                <div id="announcements-cont">
                    {this.renderAnnouncements()}
                </div>
            </div>
        )
    }
}
