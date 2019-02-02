import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNewAnnouncementsAction } from '../../../actions/room/announcement/loadNewAnnouncementsAction';

import AnnouncementPreview from './AnnouncementPreview';

class Announcements extends Component {
    constructor(props) {
        super(props);

        this.lastScroll; // decide if user has scrolled downwars or not
        this.noAnnouncementIcon = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-announcement-256.png?alt=media&token=b3fcffdc-682c-4c99-850e-608e01c1e330';

        this.state = { loadEventFired: false };
    }

    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }  

    renderAnnouncements() {

        // if room has announcements
        if (this.props.announcements && Object.keys(this.props.announcements).length > 0) {

            // add event to load data on cont scroll end
            window.addEventListener('scroll', this.handleScroll);

            // render announcemnts in descending order (date posted)
            return Object.entries(this.props.announcements)
                .sort((a, b) => b[1].timestamp - a[1].timestamp)
                .map(([id, announcement]) => <AnnouncementPreview key={id} id={id} />
            );
        }
    
        return (
            <StyledNoAnnouncements className="animated fadeIn">
                <img src={this.noAnnouncementIcon} alt="No announcements posted in this room" />
                <p>No announcements has been posted in this room</p>
            </StyledNoAnnouncements>
        )
    }

    handleScroll = () => {

        // only on scrollDown direction and prev content loaded
        if (window.scrollY > this.lastScroll && !this.props.fetcingNextAnnoucements) {

            const announcementsCont = document.querySelector('#announcements-cont');
            if (window.scrollY >= (announcementsCont.offsetTop + 200)) {

                if (!this.state.loadEventFired) {

                    this.setState({ loadEventFired: true });
                    console.log('fetching data...');
                    this.props.loadNewAnnouncementsAction(true);
                }
            }
        }

        // update last scrolled pos
        this.lastScroll = window.scrollY;
    }

    render() {
        return (
            <StyledAnnouncements>
                <h2>Announcements</h2>
                <div id="announcements-cont" className="row">
                    {this.renderAnnouncements()}
                </div>
            </StyledAnnouncements>
        )
    }
}


const mapStateToProps = state => {
    return { 
        announcements: state.room.activeRoom.announcements,
        fetcingNextAnnoucements: state.room.activeRoom.fetcingNextAnnoucements
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ loadNewAnnouncementsAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);


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