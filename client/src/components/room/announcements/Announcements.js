import React, { Component } from 'react';
import AnnouncementPreview from './AnnouncementPreview';

const mockData = [
    {
        id: '1',
        title: 'Welcome Students!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim placerat augue id tristique. Nullam et erat mi. Donec at sagittis odio, nec venenatis nulla. Donec accumsan sagittis metus id feugiat. Aliquam justo risus, egestas non ipsum ac, imperdiet lobortis purus. Aliquam erat volutpat. Cras arcu eros, porttitor id libero a, elementum eleifend tellus. Morbi ullamcorper, felis sit amet lacinia ornare, leo enim fringilla nulla, sed mattis urna nibh in nisi.',
        date: '04.11.2018'
    },
    {
        id: '2',
        title: 'A friendly Remainder...',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '01.11.2018'
    },
    {
        id: '3',
        title: 'Quiz Next Tueseday',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim placerat augue id tristique. Nullam et erat mi. Donec at sagittis odio, nec venenatis nulla. Donec accumsan sagittis metus id feugiat. Aliquam justo risus, egestas non ipsum ac, imperdiet lobortis purus. Aliquam erat volutpat. Cras arcu eros, porttitor id libero a, elementum eleifend tellus. Morbi ullamcorper, felis sit amet lacinia ornare, leo enim fringilla nulla, sed mattis urna nibh in nisi.',
        date: '05.11.2018'
    }
]

export default class Announcements extends Component {
    constructor() {
        super();
    }

    renderAnnouncements() {
        return mockData.map(announcement => {
            return (
                <AnnouncementPreview
                key={mockData.indexOf(announcement)}
                data={announcement} 
                />
            )
        });
    }

    render() {
        return (
            <div id="room-announcements">
                <h2>Announcements</h2>
                <div id="announcements-cont">
                    {this.renderAnnouncements()}
                    {this.renderAnnouncements()}
                    {this.renderAnnouncements()}
                    {this.renderAnnouncements()}
                    {this.renderAnnouncements()}
                </div>
            </div>
        )
    }
}
