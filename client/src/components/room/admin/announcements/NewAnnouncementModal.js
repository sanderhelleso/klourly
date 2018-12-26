import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';

export default class NewAnnouncementModal extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            message: '',
            maxLengthTitle: 50,
            maxLengthMessage: 2000
        }
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

    render() {
        return (
            <div id="new-announcement-modal" className="modal modal-fixed-footer">
                <div className="modal-content center-align">
                    <StyledHeader>
                        <h4>New Announcement</h4>
                        <p>Publish a New Announcement</p>
                    </StyledHeader>
                    <div className="row">
                        <form className="col s12 m8 offset-m2">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        required
                                        name="title"
                                        id="new-announcement-title" 
                                        type="text" 
                                        min-length={1} 
                                        maxLength={this.state.maxLengthTitle}
                                        onChange={(e) => this.updateAnnouncement(e)}
                                    />
                                    <label for="new-announcement-title">Title</label>
                                    <StyledMessage>{this.state.title.length} / {this.state.maxLengthTitle}</StyledMessage>
                                </div>
                                <div class="input-field col s12">
                                    <textarea 
                                        required
                                        name="message"
                                        id="new-announcement-body" 
                                        className="materialize-textarea" 
                                        minLength={1} 
                                        maxLength={this.state.maxLengthMessage}
                                        onChange={(e) => this.updateAnnouncement(e)}
                                    ></textarea>
                                    <label for="new-announcement-body">Message</label>
                                    <StyledMessage>{this.state.message.length} / {this.state.maxLengthMessage}</StyledMessage>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    <a class="waves-effect waves-green btn-flat">Publish</a>
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

