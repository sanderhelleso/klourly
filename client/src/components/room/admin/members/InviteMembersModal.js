import React, { Component } from 'react';
import { AlertOctagon } from 'react-feather';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInviteRoomMembersModalAction } from '../../../../actions/room/members/updateInviteRoomMembersModalAction';

import LinearLoader from '../../../loaders/LinearLoader';
import { StyledButtonMain } from '../../../styles/buttons';

class InviteMembersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            instance: null
        }
    }

    renderEmailInput() {

        return (
            <div className="input-field col s10 offset-s1 m9 l6 offset-l2">
                <input 
                    required
                    name="email"
                    id="new-email-recipent" 
                    type="email" 
                />
                <label htmlFor="new-email-recipent">E-mail recipent</label>
            </div>
        )
    }

    renderaddEmailBtn() {

        return (
            <StyledBtnCont className="input-field col s10 offset-s1 m3 l2">
                <StyledButtonMain>Add</StyledButtonMain>
            </StyledBtnCont>
        )
    }

    componentDidMount() {

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

    renderFooter() {
        if (!this.state.loading) {
            return (
                <div>
                    
                </div>
            )
        }

        return <LinearLoader center={false} loading={this.state.loading} />
    }

    render() {
        return (
            <StyledModal id="invite-member-modal" className="modal">
                <StyledModalContent className="modal-content">
                    <StyledHeader>
                        <h4>Invite members</h4>
                        <p>Send the room invitation link to e-mail recipents</p>
                    </StyledHeader>
                    <div className="row">
                        {this.renderEmailInput()}
                        {this.renderaddEmailBtn()}
                    </div>
                </StyledModalContent>
                {this.renderFooter()}
            </StyledModal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateInviteRoomMembersModalAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(InviteMembersModal);


const StyledModal = styled.div`

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

