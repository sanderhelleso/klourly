import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeAnnouncementPollAction } from '../../../../actions/room/announcement/removeAnnouncementPollAction';
import { updateAnnouncementsAction } from '../../../../actions/room/announcement/updateAnnouncementsAction';
import { openAnnouncementAction } from '../../../../actions/room/announcement/openAnnouncementAction';

import { room } from '../../../../api/room/room';
import { token } from '../../../../api/messaging/token';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import { redirect } from '../../../../helpers/redirect';

import AnnouncementPoll from './AnnouncementPoll';

class NewAnnouncementModal extends Component {
    constructor(props) {
        super(props);

        this.MAX_LENGTH_TITLE =    50;
        this.MAX_LENGTH_MESSAGE =  2000;
        this.MAX_POLL_TITLE_LENGTH = 50;
        this.titleError = `Title must be between 1 - ${this.MAX_LENGTH_TITLE} characters`;
        this.messageError = `Message must be between 1 - ${this.MAX_LENGTH_MESSAGE} characters`;
        this.pollError = 'Please include atleast two poll options or remove the poll to continue';
        this.pollTitleError = 'Please enter a name for your poll';


        this.state = {
            title: '',
            message: ''
        }
    }

    componentDidMount = () => materializeJS.M.Modal.init(
        document.querySelectorAll('.modal'), { endingTop: '7.5%' }
    );

    updateAnnouncement = e => this.setState({ [e.target.name]: e.target.value });


    publishAnnouncement = async () => {

        // validate title
        if (this.state.title.trim() === '' || this.state.title.length > this.MAX_LENGTH_TITLE) {
            return notification.error(this.titleError);
        }

        // validate message
        if (this.state.message.trim() === '' || this.state.message.length > this.MAX_LENGTH_MESSAGE) {
            return notification.error(this.messageError);
        }

        // create announcement data
        const data = {
            title: this.state.title,
            message: this.state.message
        }

        // check if user needs to add poll
        if (this.props.pollData.poll) {

            // validate modal title
            if (!this.props.pollData.pollName) return notification.error(this.pollTitleError);

            else if (this.props.pollData.pollName === '' || this.props.pollData.pollName.length > this.MAX_POLL_TITLE_LENGTH) {
                return notification.error('Poll name ust be between 1-50 characters');
            }

            // validate options
            if (!this.props.pollData.pollOptions || this.props.pollData.pollOptions.length < 2) {
                return notification.error(this.pollError);
            }

            // create options
            const options = {};
            this.props.pollData.pollOptions.forEach(option => {
                options[option] = { votes: 0 };
            });

            // set poll options
            data.poll = { name: this.props.pollData.pollName, options } 
        };

        // attempt to publish announcement
        const response = await room.publishAnnouncement(this.props.userID, this.props.roomID, data);

        // check if post was successfull
        if (response.data.success) {

            // send push notifications to subscribed room members
            const notificationData = {
                title: 'New announcement posted',
                body: `A new announcement got posted in "${this.props.roomName}". Lets see whats up!`,
                icon: this.props.roomCover,
                click_action: `http://localhost:3000/dashboard/rooms/${this.props.roomID}/announcements/${response.data.announcementID}`
            };

            token.getRoomMembersToken(
                this.props.userID, 
                this.props.roomMembers, 
                notificationData
            );

            // remove modal
            document.querySelector('.modal-close').click();

            // reset announcement data
            this.setState({ title: '', message: ''});
            this.props.removeAnnouncementPollAction();

            // redirect to announcement
            this.props.openAnnouncementAction(response.data.announcement);
            redirect.announcement(this.props.roomID, response.data.announcementID);
        }

        // alert user
        notification.success(response.data.message);
    }

    renderTitle() {

        return (
            <div className="input-field col s12">
                <input 
                    required
                    name="title"
                    id="new-announcement-title" 
                    type="text" 
                    min-length={1} 
                    maxLength={this.MAX_LENGTH_TITLE}
                    value={this.state.title}
                    onChange={(e) => this.updateAnnouncement(e)}
                />
                <label htmlFor="new-announcement-title">Title</label>
                <StyledMessage>
                    {this.state.title.length} / {this.MAX_LENGTH_TITLE}
                </StyledMessage>
            </div>
        )
    }

    renderMessage() {
        
        return (
            <div className="input-field col s12">
                <textarea 
                    required
                    name="message"
                    id="new-announcement-body" 
                    className="materialize-textarea" 
                    minLength={1} 
                    maxLength={this.MAX_LENGTH_MESSAGE}
                    value={this.state.message}
                    onChange={(e) => this.updateAnnouncement(e)}
                ></textarea>
                <label htmlFor="new-announcement-body">Message</label>
                <StyledMessage>
                    {this.state.message.length} / {this.MAX_LENGTH_MESSAGE}
                </StyledMessage>
            </div>
        )
    }

    render() {
        return (
            <StyledModal id="new-announcement-modal" className="modal modal-fixed-footer">
                <div className="modal-content center-align">
                    <StyledHeader>
                        <h4>New Announcement</h4>
                        <p>Publish a New Announcement</p>
                    </StyledHeader>
                    <div className="row">
                        <div className="col s12 m12 l6 announcement-cont">
                            <div className="row">
                                {this.renderTitle()}
                                {this.renderMessage()}
                            </div>
                        </div>
                        <div className="col s12 m12 l6">
                            <div className="row poll-cont">
                                <AnnouncementPoll />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    <button 
                        className="waves-effect waves-green btn-flat" 
                        onClick={this.publishAnnouncement}>
                        Publish
                    </button>
                </div>
            </StyledModal>
        )
    }
}


const mapStateToProps = state => {
    return {
        roomCover: state.room.activeRoom.cover.small,
        roomName: state.room.activeRoom.name,
        pollData: state.room.activeRoom.newAnnouncement,
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        roomMembers: state.room.activeRoom.members
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeAnnouncementPollAction,
        updateAnnouncementsAction,
        openAnnouncementAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncementModal);


const StyledModal = styled.div`
    min-height: 85%;
    min-width: 75%;

    .modal-content {
        padding: 2rem;
    }

    .poll-cont {
        border-left: 1px solid #e0e0e0;
        padding: 2rem 0;
        min-height: 350px;
    }

    .announcement-cont {
        padding-right: 5rem;
        margin-top: 3rem;
        position: sticky;
        top: 0;
    }

    @media screen and (min-width: 1300px) {
        min-width: 1200px;
    }

    @media screen and (max-width: 1000px) {
        .poll-cont {
            border-left: none;
        }

        .announcement-cont {
            position: relative;
            padding-right: 0;
        }
    }
`;

const StyledHeader = styled.div`
    margin: 2rem 0.5rem 4rem 0;
    text-align: left;

    h4 {
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
        font-size: 1.25rem;
    }

    @media screen and (max-width: 800px) {
        
        h4  {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 450px) {
        
        h4  {
            font-size: 1.5rem;
        }
    }
`;

const StyledMessage = styled.span`
    color: #9e9e9e;
    font-weight: 100;
    font-size: 0.9rem;
    float: right;
`;