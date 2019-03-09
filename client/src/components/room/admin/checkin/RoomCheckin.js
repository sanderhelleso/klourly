import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activate from './Activate';
import Deactivate from './Deactivate';
import BackToRoom from '../../BackToRoom';
import CheckinStatus from './CheckinStatus';
import RadiusOptions from './RadiusOptions';
import NoMembersPlaceholder from '../../placeholders/NoMembersPlaceholder';
import ActivateWithCode from './ActivateWithCode';
import ActivateForMembers from './ActivateForMembers';

class AdminCheckin extends Component {
    constructor(props) {
        super(props);
    }

    renderStatus() {

        // render checkin status if active checkin
        if (this.props.activeCheckin.active) {
            return (
                <div className="row">
                    <div className="col s12 m12 l6">qweqe</div>
                    <CheckinStatus 
                        roomID={this.props.roomID}
                        userID={this.props.userID}
                        checkinID={this.props.activeCheckin.active 
                        ? this.props.activeCheckin.checkinID 
                        : null} 
                    />
                </div>
            )
        }

        return (
            <StyledOptionCont className="row">
                <span>or</span>
                <ActivateForMembers />
                <ActivateWithCode />
            </StyledOptionCont>
        )
    }

    renderComponent() {

        // cant perform checkin if room dont have any members
        if (!this.props.members || this.props.members.length === 0) {
            return <NoMembersPlaceholder 
                text="checkin"
                roomID={this.props.roomID} 
                includeLink={true} 
            />
        }

        return (
            <Fragment>
                {this.renderStatus()}
            </Fragment>
        );
    }

    render() {
        return (
            <StyledMain className="container">
                <h1>Checkin</h1>
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    {this.renderComponent()}
                </div>
            </StyledMain>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckin: state.room.activeRoom.checkin,
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        members: state.room.activeRoom.members
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckin);

const StyledMain = styled.main`
    position: relative;

    h1 {
        position: absolute;
        font-size: 6.5rem;
        color: #e0e0e0;
        font-weight: 100;
        letter-spacing: 5px;
        text-transform: uppercase;
        top: 50%;
        left: -30%;
        z-index: -1;
        opacity: 0.7;
        transform: rotate(-90deg);
        display: none;

        @media screen and (max-width: 1200px) {
            display: none;
        }
    }
`;


const StyledOptionCont = styled.div`
    text-align: center;
    position: relative;

    h5 {
        text-transform: capitalize;
        margin-bottom: 1rem;
        font-size: 1.75rem;
    }

    img {
        min-width: 175px;
        max-width: 175px;
        min-height: 175px;
        max-height: 175px;
    }

    p {
        color: #9e9e9e;
        max-width: 300px;
        margin: 0 auto;
        margin-bottom: 1rem;
    }

    a {
        max-width: 250px;
        margin: 1rem auto;
    }

    span {
        display: block;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        text-transform: uppercase;
        font-size: 4rem;
        letter-spacing: 5px;
        color: #e0e0e0;
        opacity: 0.7;
        z-index: -1;
    } 
`;

const StyledHeader = styled.div`

    min-height: 220px !important;
    text-align: center;

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: capitalize;
        font-size: 2.75rem;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 550px;
        margin: 1rem auto;
    }

    span {
        display: block;
        color: #9e9e9e;
    }
`;
