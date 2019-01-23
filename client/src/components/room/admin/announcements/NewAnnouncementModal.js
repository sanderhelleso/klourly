import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeAnnouncementPollAction } from '../../../../actions/room/announcement/removeAnnouncementPollAction';
import { updateAnnouncementsAction } from '../../../../actions/room/announcement/updateAnnouncementsAction';

import { room } from '../../../../api/room/room';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import { redirect } from '../../../../helpers/redirect';

import AnnouncementPoll from './AnnouncementPoll';

class NewAnnouncementModal extends Component {
    constructor(props) {
        super(props);

        this.MAX_LENGTH_TITLE =    50;
        this.MAX_LENGTH_MESSAGE =  2000;
        this.titleError = `Title must be between 1 - ${this.MAX_LENGTH_TITLE} characters`;
        this.messageError = `Message must be between 1 - ${this.MAX_LENGTH_MESSAGE} characters`;
        this.pollError = 'Please include atleast two poll options or remove the poll to continue';

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
        if (this.state.title === '' || this.state.title.length > this.MAX_LENGTH_TITLE) {
            return notification.error(this.titleError);
        }

        // validate message
        if (this.state.message === '' || this.state.message.length > this.MAX_LENGTH_MESSAGE) {
            return notification.error(this.messageError);
        }

        // create announcement data
        const data = {
            title: this.state.title,
            message: this.state.message
        }

        // check if user needs to add poll
        if (this.props.pollData.poll) {

            if (!this.props.pollData.pollOptions || this.props.pollData.pollOptions.length < 2) {
                return notification.error(this.pollError);
            }

            // create options
            const options = {};
            this.props.pollData.pollOptions.forEach(option => {
                options[option] = { votes: 0 };
            });

            // set poll options
            data.poll = { name: this.props.pollData.name, options } 
        };

        // attempt to publish announcement
        const response = await room.publishAnnouncement(this.props.userID, this.props.roomID, data);

        // check if post was successfull
        if (response.data.success) {

            // reset announcement data
            this.setState({ title: '', message: ''});
            this.props.removeAnnouncementPollAction();

            // update rooms announcement list
            this.props.updateAnnouncementsAction({
                announcementID: response.data.announcementID,
                announcement: response.data.announcement
            });

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
        pollData: state.room.activeRoom.newAnnouncement,
        roomID: state.room.activeRoom.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeAnnouncementPollAction,
        updateAnnouncementsAction
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
    }

    @media screen and (min-width: 1300px) {
        min-width: 1200px;
    }

    @media screen and (max-width: 1000px) {
        .poll-cont {
            border-left: none;
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
`;

const StyledMessage = styled.span`
    color: #9e9e9e;
    font-weight: 100;
    font-size: 0.9rem;
    float: right;
`;