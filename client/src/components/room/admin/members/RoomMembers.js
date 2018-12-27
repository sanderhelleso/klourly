import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import InvitationLink from './InvitationLink';

class RoomMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkHidden: false
        }
    }

    renderLink() {
        return this.state.linkHidden ? null : <InvitationLink />
    }

    renderLinkBtn() {

        return (
            <RenderLinkBtn 
                className="waves-effect waves-teal btn-flat"
                onClick={() => 
                this.setState({
                    linkHidden: this.state.linkHidden ? false : true
                })}>
                {this.state.linkHidden ? 'Show' : 'Hide'} Invitation Link
            </RenderLinkBtn>
        );
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.state.room.activeRoom.id} />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Members</h3>
                        <p>Invite, remove and see memebers of the room</p>
                        {this.renderLinkBtn()}
                    </StyledHeader>
                    {this.renderLink()}
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

const RenderLinkBtn = styled.button`

    font-weight: 600;
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
