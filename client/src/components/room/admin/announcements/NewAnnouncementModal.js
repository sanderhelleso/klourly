import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';

export default class NewAnnouncementModal extends Component {

    componentDidMount() {
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {});
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
                                    <input id="new-announcement-title" type="text" min-length={1} maxLength={50}/>
                                    <label for="new-announcement-title">Title</label>
                                </div>
                                <div class="input-field col s12">
                                    <textarea id="new-announcement-body" class="materialize-textarea" min-length={1} maxLength={500}></textarea>
                                    <label for="new-announcement-body">Message</label>
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

