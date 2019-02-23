import React, { Component } from 'react';
import { Eye, EyeOff, Mail } from 'react-feather';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import InvitationLink from './InvitationLink';
import MembersList from './MembersList';
import DeleteMemberModal from './DeleteMemberModal';
import InviteMembersModal from './InviteMembersModal';

class RoomMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkHidden: false,
            confirmDelete: {
                openModal: false,
                data: {}
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        // check for new data
        if (this.props.confirmDeleteMember !== nextProps.confirmDeleteMember) {
            this.setState({
                confirmDelete: {
                    openModal: true,
                    data: nextProps.confirmDeleteMember
                }
            });
        }
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
            <StyledBtn className="waves-effect waves btn-flat">
                <Mail size={17} /> Send to E-mails
            </StyledBtn>
        )
    }

    renderConfirmDeleteModal() {

        if (!this.props.confirmDeleteMember) return null;

        return (
            <DeleteMemberModal 
                roomID={this.props.roomID} 
                data={this.state.confirmDelete.data} 
            />
        );
    }

    renderInviteMemberModal() {

        if (!this.props.openInviteMembersModal) return null;
        
        return <InviteMembersModal roomID={this.props.roomID} />
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6 animated fadeIn">
                        <h3>Members</h3>
                        <p>Invite, remove and see memebers of the room.</p>
                        {this.renderLinkBtn()}
                        {this.renderSendToEmailsBtn()}
                    </StyledHeader>
                    {this.renderLink()}
                </div>
                <MembersList />
                {this.renderConfirmDeleteModal()}
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        openInviteMembersModal: state.room.activeRoom.openInviteMembersModal,
        confirmDeleteMember: {
            ...state.room.activeRoom.confirmDeleteMember 
            ? state.room.activeRoom.confirmDeleteMember 
            : null
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomMembers);

const StyledHeader = styled.div`

    min-height: 220px !important;

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
`;
