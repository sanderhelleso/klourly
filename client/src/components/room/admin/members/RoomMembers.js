import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import InvitationLink from './InvitationLink';

class RoomMembers extends Component {
    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.state.room.activeRoom.id} />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Members</h3>
                        <p>Invite, remove and see memebers of the room</p>
                    </StyledHeader>
                    <InvitationLink />
                </div>
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomMembers);

const StyledHeader = styled.div`
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
