import React, { Component } from 'react';
import { RefreshCw } from 'react-feather';
import styled, { keyframes } from 'styled-components';
import { format } from '../../../../helpers/format';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomInviteAction } from '../../../../actions/room/updateRoomInviteAction';

import { notification } from '../../../../helpers/notification';

class InvitationLink extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            ...this.props.activeRoom.invite,
            loadingNewInvite: false
        }

        this.generateNewLink = this.generateNewLink.bind(this);
    }

    renderLink() {
        return (
            <StyledInvite>
                <h4>Invitation Link</h4>
                <h5>{this.state.url}</h5>
                <p>Valid from {format.tsToDate(this.state.validFrom)} to {format.tsToDate(this.state.validTo)}</p>
                {this.renderAvailableBadge(this.state.validTo)}
                <GenerateNewBtn 
                    className="waves-effect waves-purple btn-flat"
                    disabled={this.state.loadingNewInvite}
                    onClick={this.generateNewLink}
                >
                    {this.renderLoadingIcon()}
                    Generate New
                </GenerateNewBtn>
            </StyledInvite>
        )
    }

    renderLoadingIcon() {
        return this.state.loadingNewInvite 
        ? 
        <Rotate>
            <RefreshCw size={22} /> 
        </Rotate>
        : 
        <RefreshCw size={17}/>;
    }

    renderAvailableBadge(validTo) {

        // check if validTo is less than todays time
        if (parseInt(validTo) < new Date().getTime()) {
            return <ExpiredBadge>Expired</ExpiredBadge>
        }

        return <AvailableBadge>Available</AvailableBadge>
    }

    async generateNewLink() {
        
        // disable button whie loading new invite
        this.setState({
            loadingNewInvite: true
        });

        const response = await room.updateRoomInvite(
                        this.props.user.id, 
                        this.props.activeRoom.id);

        // new invite generation successfull
        if (response.data.success) {

            this.props.updateRoomInviteAction(response.data.newInvitation);
            this.setState({
                ...response.data.newInvitation,
            });

            notification.success(response.data.message);
        }

        // new invite generation failed
        else {
            notification.error(response.data.message);
        }

        // loading of new invite finished, enable button
        this.setState({
            loadingNewInvite: false
        });

    }

    render() {
        return (
            <div className="col s12 m6 l6 animated fadeIn">
                {this.renderLink()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        activeRoom: state.room.activeRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomInviteAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationLink);

const StyledInvite = styled.div`

    padding: 2rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background: #7F00FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    h4 {
        color: #ffffff;
        font-weight: 100;
        margin-top: 0;
        opacity: 0.7;
    }

    h5 {
        font-size: 1.35rem;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        word-break: break-all;
    }

    p {
        color: #ffffff;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
`;

const AvailableBadge = styled.span`
    background-color: #66bb6a;
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
`;

const ExpiredBadge = styled.span`
    background-color: #ff5252;
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
`;

const GenerateNewBtn = styled.button`
    font-weight: 600;
    margin-left: 1rem;
    font-size: 0.9rem;
    color: #757575;
    background-color: #eeeeee;
    border-radius: 4px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);

    &:focus, &:active {
        background-color: #eeeeee;
    }

    svg {
        margin-bottom: -3.5px;
        margin-right: 5px;
    }
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`

const Rotate = styled.div`
  animation: ${rotate} 1s linear infinite;
  svg {
      stroke: #ffffff;
      opacity: 0.7;
  }
`