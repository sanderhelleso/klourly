import React, { Component } from 'react';
import { Eye, EyeOff } from 'react-feather';
import styled from 'styled-components';
import { ToastContainer, Flip } from 'react-toastify';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import InvitationLink from './InvitationLink';
import MembersList from './MembersList';

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
            console.log('NEW, TRIGGER HERE');
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
            <RenderLinkBtn 
                className="waves-effect waves-purple btn-flat"
                
                onClick={() => 
                this.setState({
                    linkHidden: this.state.linkHidden ? false : true
                })}>
                {this.state.linkHidden ? <Eye size={18} /> : <EyeOff size={18} />}
                {this.state.linkHidden ? 'Show' : 'Hide'} Invitation Link
            </RenderLinkBtn>
        );
    }

    renderConfirmDeleteModal() {
        return (
            this.state.confirmDelete.openModal
            ? <p>DELETE</p>
            : null
        );
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Members</h3>
                        <p>Invite, remove and see memebers of the room</p>
                        {this.renderLinkBtn()}
                    </StyledHeader>
                    {this.renderLink()}
                </div>
                <MembersList />
                {this.renderConfirmDeleteModal()}
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { 
        roomID: state.room.activeRoom.id,
        confirmDeleteMember: {
            ...state.room.activeRoom.confirmDeleteMember 
            ? state.room.activeRoom.confirmDeleteMember 
            : null
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomMembers);

const StyledHeader = styled.div`

    min-height: 220px !important;

    h3 {
        margin-top: 0;
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

const RenderLinkBtn = styled.button`

    min-width: 225px;
    font-weight: 600;
    color: #757575;
    background-color: #eeeeee;
    border-radius: 4px;

    &:focus, &:active {
        background-color: #eeeeee;
    }

    svg {
        margin-bottom: -3.5px;
        margin-right: 5px;
    }
`;