import React, { Component } from 'react'

export default class RoomAnnouncements extends Component {

    render() {
        return (
            <main id="room-admin-announcement-cont" className="container">
                <h3>Announcements</h3>
                <button 
                    id="new-room-announcement-btn" 
                    className="waves-effect waves-light btn animated fadeIn">
                    New Announcement
                </button>
            </main>
        )
    }
}
