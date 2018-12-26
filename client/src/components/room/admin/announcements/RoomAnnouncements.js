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
                <BackToRoom id={this.props.state.room.activeRoom.id} />
                <StyledHeader>
                    <h3>Announcements</h3>
                    <p>Create, update and manage the rooms announcements</p>
                    <StyledButton 
                        id="new-room-announcement-btn" 
                        className="waves-effect waves-light btn animated fadeIn modal-trigger"
                        data-target="new-announcement-modal"
                        onClick={() => { document.querySelector('input').focus() }}
                    >
                        New Announcement
                    </StyledButton>
                </StyledHeader> 
                <NewAnnouncementModal />
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
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

const StyledButton = styled.button`
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.09);
    color: #ffffff;
    background-color: #00e988;
    line-height: 0;
    padding: 1.5rem 2.2rem;
    letter-spacing: 2px;
    font-size: 0.9rem;
    font-weight: 600;
    min-width: 9.5rem;
    max-width: 9.5rem;

    &:hover, &:active, &:focus {
        background-color: #00e988;
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    }
`;
