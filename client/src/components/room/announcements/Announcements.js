import React, { Component } from 'react';
import styled from 'styled-components';
import AnnouncementPreview from './AnnouncementPreview';

export default class Announcements extends Component {
    constructor(props) {
        super(props);

    }

    renderAnnouncements() {
        if (this.props.announcements) {
            return Object.entries(this.props.announcements)
            .sort((a, b) => b[1].timestamp - a[1].timestamp)
            .map(([id, announcement]) => {
                return (
                    <AnnouncementPreview
                        key={id}
                        id={id}
                    />
                )
            });
        }

        return <p>No announcements has been posted in this room</p>
    }

    render() {
        return (
            <StyledAnnouncements>
                <h2>Announcements</h2>
                {this.renderAnnouncements()}
            </StyledAnnouncements>
        )
    }
}

const StyledAnnouncements = styled.div`

    padding: 0 3rem;

    h3 {
        margin-top: 0;
    }

    h2 {
        color: #bdbdbd;
        opacity: 0.3;
        margin: 0 0 5rem 0;
        font-size: 2.5rem;
        text-transform: uppercase;
    }
`;
