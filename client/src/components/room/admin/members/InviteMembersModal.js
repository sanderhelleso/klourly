import React, { Component } from 'react';
import { AlertOctagon, X, XCircle } from 'react-feather';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import { invite } from '../../../../api/room/invite';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInviteRoomMembersModalAction } from '../../../../actions/room/members/updateInviteRoomMembersModalAction';

import LinearLoader from '../../../loaders/LinearLoader';
import { StyledButtonMain } from '../../../styles/buttons';

class InviteMembersModal extends Component {
    constructor(props) {
        super(props);

        // regex pattern for valid email
        this.REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.state = {
            loading: false,
            recipients: [],
            email: ''
        }
    }

    componentCleanup = () => this.props.updateInviteRoomMembersModalAction(false)

    componentWillUnmount() {

        // remove modal acitvation on unmount
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentDidMount() {

        window.addEventListener('beforeunload', this.componentCleanup);

        // prepare modal
        const modal = document.querySelector('#invite-member-modal');
        const init = materializeJS.M.Modal.init(modal, { 
            endingTop: '7.5',
            onCloseEnd: () => {
                this.props.updateInviteRoomMembersModalAction(false)
            }
        });
        init.open(); 
    }

    updateEmail = e => this.setState({ [e.target.name]: e.target.value });

    addEmailToList = () => {

        if (this.REGEX_EMAIL.test(String(this.state.email).toLowerCase())) {

            if (this.state.recipients.indexOf(this.state.email) !== -1) {
                return notification.error('Unable to add recipient. E-mail is already in list of recipients');
            }

            return this.setState({ 
                recipients: [...this.state.recipients, this.state.email],
                email: ''
            }, () => document.querySelector('#new-email-recipent').focus());
        }

        notification.error('Unable to add recipient. E-mail is in invalid format');
    }

    removeRecipient = recipient => {
        this.setState({ 
            recipients: this.state.recipients.filter(r => r !== recipient) 
        });
    }

    sendLinkToRecipients = async () => {

        this.setState({ loading: true });

        const response = await invite.sendRoomInviteToRecipients(
            this.props.userID, this.props.roomID, 
            this.props.invitationCode, this.state.recipients
        );

        if (response.data.success) {
            this.setState({ recipients: [] });
            notification.success(response.data.message);
        }

        else notification.error(response.data.message);

        this.setState({  loading: false });
    }

    renderRecipients() {
        return this.state.recipients.map(recipient => {
            return (
                <StyledChip 
                    key={recipient}
                    className="no-select"
                >
                    {recipient}
                    <span 
                        onClick={() => this.removeRecipient(recipient)}
                    >
                        <XCircle size={15} />
                    </span>
                </StyledChip>
            )
        });
    }

    renderEmailInput() {

        return (
            <div className="input-field col s10 offset-s1 m9 l6 offset-l2">
                <input 
                    required
                    name="email"
                    id="new-email-recipent" 
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.updateEmail(e)}
                />
                <label htmlFor="new-email-recipent">E-mail recipent</label>
            </div>
        )
    }

    renderaddEmailBtn() {

        return (
            <StyledBtnCont className="input-field col s10 offset-s1 m3 l2">
                <StyledButtonMain 
                    className="waves-effect waves-light btn"
                    onClick={this.addEmailToList}
                    disabled={this.state.email.trim().length < 2}
                >
                    Add
                </StyledButtonMain>
            </StyledBtnCont>
        )
    }

    renderFooter() {
        if (!this.state.loading) {
            return (
                <div className="modal-footer">
                    <a className="modal-close close-invite waves-effect waves-purple btn-flat">Cancel</a>
                    <button 
                        className="waves-effect waves-purple btn-flat"
                        disabled={this.state.recipients.length === 0 || this.state.loading}
                        onClick={this.sendLinkToRecipients}
                    >
                        Send
                    </button>
                </div>
            )
        }

        return <LinearLoader center={false} loading={this.state.loading} />
    }

    render() {
        return (
            <StyledModal id="invite-member-modal" className="modal modal-fixed-footer">
                <StyledModalContent className="modal-content">
                    <StyledHeader>
                        <h4>Invite members</h4>
                        <p>Send the room invitation link to e-mail recipients</p>
                    </StyledHeader>
                    <div className="row">
                        {this.renderEmailInput()}
                        {this.renderaddEmailBtn()}
                    </div>
                    <StyledRecipients>
                        <h5>{this.state.recipients.length} recipients added</h5>
                        {this.renderRecipients()}
                    </StyledRecipients>
                </StyledModalContent>
                {this.renderFooter()}
            </StyledModal>
        )
    }
}


const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        invitationCode: state.room.activeRoom.invite.inviteID
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateInviteRoomMembersModalAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMembersModal);


const StyledModal = styled.div`
    min-height: 85%;
`;

const StyledModalContent = styled.div`
    position: relative;
    padding: 2rem !important;
`;

const StyledHeader = styled.div`
    margin: 2rem auto 4rem auto;
    text-align: center;

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

const StyledBtnCont = styled.div`

    text-align: center;

    a {
        padding: 1.25rem !important;
        margin: 1rem 0 !important;

        @media screen and (max-width: 600px) {
           margin: 0 !important;
           padding: 2rem !important;
           height: 50px;
        }
    }
`;

const StyledChip = styled.div`
    border-radius: 20px;
    background-color: #e0e0e0;
    color: #757575;
    font-size: 0.8rem;
    display: inline-block;
    margin: 0.25rem;
    padding: 0.4rem 0.65rem;

    svg {
        display: inline-block;
        margin-left: 0.5rem;
        margin-bottom: -3px;
        stroke: #9e9e9e;
        cursor: pointer;
    }
`;

const StyledRecipients = styled.div`
    
    padding-top: 2rem;
    border-top: 1px solid #eeeeee;
    min-width: 100%;

    h5 {
        font-size: 1rem;
        color: #9e9e9e;
        text-align: left;
        margin-left: 0.65rem;
    }
`;

