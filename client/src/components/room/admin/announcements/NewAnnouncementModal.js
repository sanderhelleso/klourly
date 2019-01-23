import React, { Component } from 'react';
import styled from 'styled-components';

import { room } from '../../../../api/room/room';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import AnnouncementPoll from './AnnouncementPoll';

export default class NewAnnouncementModal extends Component {
    constructor(props) {
        super(props);

        this.MAX_LENGTH_TITLE =    50;
        this.MAX_LENGTH_MESSAGE =  2000;

        this.state = {
            title: '',
            message: '',
            titleError: `Title must be between 1 - ${this.MAX_LENGTH_TITLE} characters`,
            messageError: `Message must be between 1 - ${this.MAX_LENGTH_MESSAGE} characters`
        }
    }

    componentDidMount() {
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, { endingTop: '7.5%' });
    }

    updateAnnouncement = e => this.setState({ [e.target.name]: e.target.value });


    async publishAnnouncement() {

        // validate title
        if (this.state.title === '' || this.state.title.length > this.MAX_LENGTH_TITLE) {
            return notification.error(this.state.titleError);
        }

        // validate message
        if (this.state.message === '' || this.state.message.length > this.MAX_LENGTH_MESSAGE) {
            return notification.error(this.state.messageError);
        }

        // create announcement data
        const data = {
            title: this.state.title,
            message: this.state.message
        }

        // attempt to publish announcement
        const response = await room.publishAnnouncement(this.props.userID, this.props.roomID, data);

        if (response.data.success) {

            notification.success(response.data.message);

            this.setState({
                title: '',
                message: ''
            });

            // close modal
            document.querySelector('.modal-close').click();
        }

        else notification.error(response.data.message);
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