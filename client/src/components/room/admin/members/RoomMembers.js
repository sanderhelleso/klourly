import React, { Component } from 'react';
import { Eye, EyeOff, Mail } from 'react-feather';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInviteRoomMembersModalAction } from '../../../../actions/room/members/updateInviteRoomMembersModalAction';

import BackToRoom from '../../BackToRoom';
import InvitationLink from './InvitationLink';
import MembersList from './MembersList';
import DeleteMemberModal from './DeleteMemberModal';
import InviteMembersModal from './InviteMembersModal';

class RoomMembers extends Component {
    constructor(props) {
        super(props);

        this.state = { linkHidden: false };
    }

    renderLink() {
        return this.state.linkHidden ? null : <InvitationLink />
    }

    renderLinkBtn() {

        return (
            <StyledBtn 
                className="waves-effect waves btn-flat"
                onClick={() => this.setState({ linkHidden: this.state.linkHidden ? false : true })}
            >
                {this.state.linkHidden ? <Eye size={18} /> : <EyeOff size={18} />}
                {this.state.linkHidden ? 'Show' : 'Hide'} Invitation Link
            </StyledBtn>
        );
    }

    renderSendToEmailsBtn() {
        return (
            <StyledBtn 
                className="waves-effect waves btn-flat"
                onClick={() => this.props.updateInviteRoomMembersModalAction(true)}
            >
                <Mail size={17} /> Send to E-mails
            </StyledBtn>
        )
    }

    renderConfirmDeleteModal() {

        if (!this.props.confirmDeleteMember) return null;

        return (
            <DeleteMemberModal 
                roomID={this.props.roomID} 
                data={this.props.confirmDeleteMember} 
            />
        );
    }

    renderInviteMembersModal() {

        if (!this.props.openInviteMembersModal) return null;
        
        return  <InviteMembersModal />
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <StyledHeader className="col s12 m8 offset-m2 l6 animated fadeIn">
                        <h3>Members</h3>
                        <p>Invite, remove and see memebers of the room.</p>
                        {this.renderLinkBtn()}
                        {this.renderSendToEmailsBtn()}
                    </StyledHeader>
                    {this.renderLink()}
                </div>
                <MembersList />
                {this.renderInviteMembersModal()}
                {this.renderConfirmDeleteModal()}
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        openInviteMembersModal: state.room.activeRoom.openInviteMembersModal,
        confirmDeleteMember: state.room.activeRoom.confirmDeleteMember 
            ? state.room.activeRoom.confirmDeleteMember 
            : null
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateInviteRoomMembersModalAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomMembers);

const StyledHeader = styled.div`

    min-height: 220px !important;

    @media screen and (max-width: 1000px) {
        margin-bottom: 3rem;
        text-align: center;
    }

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 3px;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 600px) {
        text-align: center;
    }
`;

const StyledBtn = styled.button`

    min-width: 225px;
    height: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    background-color: #e0e0e0;
    border-radius: 4px;
    color: #757575;
    display: block;
    margin-bottom: 1.25rem;

    svg {
        margin-top: 10px;
        margin-left: 5px;
        float: left;
    }

    @media screen and (max-width: 1000px) {
        margin: 1.25rem auto;
    }
`;
