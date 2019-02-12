import React, { Component } from 'react';
import styled from 'styled-components';
import { ToastContainer, Flip } from 'react-toastify';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import NewAnnouncementModal from './NewAnnouncementModal';
import { StyledButtonMain } from '../../../styles/buttons';


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
                    <StyledBtnCont>
                        <StyledButtonMain 
                            id="new-room-announcement-btn" 
                            className="waves-effect waves-light btn animated fadeIn modal-trigger"
                            data-target="new-announcement-modal"
                            onClick={() => setTimeout(() => { document.querySelector('input').focus() }, 150)}
                        >
                            New Announcement
                        </StyledButtonMain>
                    </StyledBtnCont>
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
        font-size: 3rem;
        text-transform: capitalize;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 600px) {

        text-align: center;

        h3 {
            font-size: 2.25rem;
        }

        p {
            font-size: 1rem;
        }
    }
`;

const StyledBtnCont = styled.div`
    margin: 4rem 0 2rem 0;

    a {
        margin: 0 !important;
    }

    @media screen and (max-width: 600px) {
        margin: 4rem auto 2rem auto;
        
        a {
            max-width: 100%;
        }
    }
`;
