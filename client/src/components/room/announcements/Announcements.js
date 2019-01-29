import React, { Component } from 'react';
import styled from 'styled-components';
import AnnouncementPreview from './AnnouncementPreview';

export default class Announcements extends Component {
    constructor(props) {
        super(props);

        this.noAnnouncementIcon = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-announcement-256.png?alt=media&token=b3fcffdc-682c-4c99-850e-608e01c1e330';

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

        return (
            <StyledNoAnnouncements className="animated fadeIn">
                <img src={this.noAnnouncementIcon} alt="No announcements posted in this room" />
                <p>No announcements has been posted in this room</p>
            </StyledNoAnnouncements>
        )
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

    @media screen and (max-width: 600px) {
        h2 {
            font-size: 1.75rem;
            margin: 0 0 2.5rem 0;
        }
    }
`;

const StyledNoAnnouncements = styled.div`

    text-align: center;

    p {
        color: #9e9e9e;
        margin: 0;
    }
`;