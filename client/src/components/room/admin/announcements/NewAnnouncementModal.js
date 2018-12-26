import React, { Component } from 'react';
import styled from 'styled-components';

import { room } from '../../../../api/room/room';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';

export default class NewAnnouncementModal extends Component {
    constructor(props) {
        super(props);

        const MAX_LENGTH_TITLE =    50;
        const MAX_LENGTH_MESSAGE =  2000;
        this.state = {
            title: '',
            message: '',
            maxLengthTitle: MAX_LENGTH_TITLE,
            maxLengthMessage: MAX_LENGTH_MESSAGE,
            titleError: `Title must be between 1 - ${MAX_LENGTH_TITLE} characters`,
            messageError: `Message must be between 1 - ${MAX_LENGTH_MESSAGE} characters`
        }

        console.log(props);
        this.publishAnnouncement = this.publishAnnouncement.bind(this);
    }

    componentDidMount() {
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {});
    }

    updateAnnouncement(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async publishAnnouncement() {

        // validate title
        if (this.state.title === '' || this.state.title.length > this.state.maxLengthTitle) {
            notification.error(this.state.titleError);
            return;
        }

        // validate message
        if (this.state.message === '' || this.state.message.length > this.state.maxLengthMessage) {
            notification.error(this.state.messageError);
            return;

        }

        // create announcement data
        const data = {
            title: this.state.title,
            message: this.state.message
        }

        // attempt to publish announcement
        const response = await room.publishAnnouncement(this.props.uid, this.props.roomID, data);

        if (response.data.success) {
            notification.success(response.data.message);
            this.setState({
                title: '',
                message: ''
            });

            // close modal
            document.querySelector('.modal-close').click();
        }

        else {
            notification.error(response.data.message);
        }
    }

    render() {
        return (
            <div id="new-announcement-modal" className="modal modal-fixed-footer">
                <div className="modal-content center-align">
                    <StyledHeader>
                        <h4>New Announcement</h4>
                        <p>Publish a New Announcement</p>
                    </StyledHeader>
                    <div className="row">
                        <div className="col s12 m8 offset-m2">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        required
                                        name="title"
                                        id="new-announcement-title" 
                                        type="text" 
                                        min-length={1} 
                                        maxLength={this.state.maxLengthTitle}
                                        value={this.state.title}
                                        onChange={(e) => this.updateAnnouncement(e)}
                                    />
                                    <label htmlFor="new-announcement-title">Title</label>
                                    <StyledMessage>{this.state.title.length} / {this.state.maxLengthTitle}</StyledMessage>
                                </div>
                                <div className="input-field col s12">
                                    <textarea 
                                        required
                                        name="message"
                                        id="new-announcement-body" 
                                        className="materialize-textarea" 
                                        minLength={1} 
                                        maxLength={this.state.maxLengthMessage}
                                        value={this.state.message}
                                        onChange={(e) => this.updateAnnouncement(e)}
                                    ></textarea>
                                    <label htmlFor="new-announcement-body">Message</label>
                                    <StyledMessage>{this.state.message.length} / {this.state.maxLengthMessage}</StyledMessage>
                                </div>
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
            </div>
        )
    }
}

const StyledHeader = styled.div`
    margin-top: 3rem;
    padding: 1rem 0;

    h4 {
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

const StyledMessage = styled.span`
    color: #9e9e9e;
    font-weight: 100;
    font-size: 0.9rem;
    float: right;
`;

