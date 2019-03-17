import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import CheckinStatus from './CheckinStatus';
import RadiusOptions from './RadiusOptions';
import ActivateWithCode from './ActivateWithCode';
import ActivateForMembers from './ActivateForMembers';
import DeactivateForMembers from './DeactivateForMembers';
import DeactivateForCode from './DeactivateForCode';
import Signal from '../../../signal/Signal';

class AdminCheckin extends Component {
    constructor(props) {
        super(props);
    }

    renderDeactivateForType() {

        // render deactivate type depending on activated type
        if (this.props.activeCheckin.type === 'members') 
            return <DeactivateForMembers />
        
        else if (this.props.activeCheckin.type === 'code') 
            return <DeactivateForCode />

        else return null;
    }

    renderSignal() {

        return (
            <div id="signal-cont" className="col s12">
                <Signal 
                    accuracy={this.props.userLocation.coords.accuracy}
                    gotLocation={this.props.userLocation.gotLocation} 
                />
            </div>
        )
    }

    renderStatus() {

        // render checkin status if active checkin
        if (this.props.activeCheckin.active && this.props.hasCheckinRef) {
            return (
                <div className="row">
                    <StyledDeactivateCont 
                        className="col s12 m12 l6 deactivation-cont animated fadeIn"
                    >
                        {this.renderDeactivateForType()}
                    </StyledDeactivateCont>
                    <CheckinStatus checkinID={this.props.activeCheckin.checkinID} />
                </div>
            )
        }

        return (
            <StyledOptionCont 
                className="row animated fadeIn options-cont"
            >
                <span>or</span>
                <ActivateForMembers 
                    members={this.props.members}
                    roomID={this.props.roomID}
                />
                <ActivateWithCode />
                {this.renderSignal()}
            </StyledOptionCont>
        )
    }

    render() {
        return (
            <StyledMain className="container">
                <h1>Checkin</h1>
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    {this.renderStatus()}
                </div>
            </StyledMain>
        )
    }
}

const mapStateToProps = state => {
    return {
        hasCheckinRef: state.room.activeCheckins,
        activeCheckin: state.room.activeRoom.checkin,
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        members: state.room.activeRoom.members,
        userLocation: state.location
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

    #signal-cont {
        margin-top: 4rem;
    }

    .deactivation-cont, .options-cont {
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
    }
`;


const StyledOptionCont = styled.div`
    text-align: center;
    position: relative;

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

        @media screen and (max-width: 1000px) {
            top: 38.5%;
        }
    } 

    @media screen and (max-width: 1000px) {
        .activate-cont {
            margin-bottom: 12.5rem;
        }
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

const StyledDeactivateCont = styled.div`
    text-align: center;

`;
