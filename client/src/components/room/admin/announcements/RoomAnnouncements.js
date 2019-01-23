import React, { Component } from 'react';
import styled from 'styled-components';
import { ToastContainer, Flip } from 'react-toastify';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import NewAnnouncementModal from './NewAnnouncementModal';


class RoomAnnouncements extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main id="room-admin-announcement-cont" className="container">
                <BackToRoom id={this.props.roomID} />
                <StyledHeader>
                    <h3>Announcements</h3>
                    <p>Create, update and manage the rooms announcements</p>
                    <StyledButton 
                        id="new-room-announcement-btn" 
                        className="waves-effect waves-light btn animated fadeIn modal-trigger"
                        data-target="new-announcement-modal"
                        onClick={() => setTimeout(() => { document.querySelector('input').focus() }, 150)}
                    >
                        New Announcement
                    </StyledButton>
                </StyledHeader> 
                <NewAnnouncementModal 
                    userID={this.props.userID} 
                    roomID={this.props.roomID}
                />
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return {
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomAnnouncements);

const StyledHeader = styled.div`
    margin-top: 3rem;
    padding: 3.5rem 0;
    border-bottom: 1px solid #eeeeee;

    h3 {
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
    }
`;

const StyledButton = styled.a`
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    display: block;
    max-width: 300px;
    margin: 4rem 0;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
        background-color: #12e2a3;
    }
`;
