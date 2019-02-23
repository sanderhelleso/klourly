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

class InviteMembersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            instance: null
        }
    }

    componentDidMount() {

        // prepare modal
        const modal = document.querySelector('#invite-member-modal');
        const init = materializeJS.M.Modal.init(modal, { 
            endingTop: '25%',
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
                    <h4>test</h4>
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
    text-align: center;

    h4 {
        margin: 2rem 0;
        font-size: 1.75rem;
    }

    p {
        color: #9e9e9e;
        font-size: 0.9rem;
    }

    svg {
        stroke: #ff5252;
        margin-bottom: 0.5rem;
        opacity: 0.8;
    }
`;


