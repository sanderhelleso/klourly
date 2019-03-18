import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CheckinPercentage from './CheckinPercentage';
import CheckinCounter from './CheckinCounter';
import CheckedinList from './CheckedinList';

class CheckinStatus extends Component {
    constructor(props) {
        super(props);
    }

    // returns the amount of attendies of chekin
    getAttendies = () => {
        return this.props.activeCheckin && this.props.activeCheckin.attendies
            ? Object.keys(this.props.activeCheckin.attendies).length
            : 0;
    }

    renderCheckinConunter() {

        return (
            <CheckinCounter
                totalMembers={
                    this.props.type === 'members' && this.props.activeCheckin 
                    ? this.props.totalMembers
                    : null
                }
                attendies={this.getAttendies()}
            />
        );
    }

    renderCheckinPercentage() {

        if (this.props.type === "members" && this.props.activeCheckin) {
            return (
                <CheckinPercentage
                    totalMembers={this.props.totalMembers}
                    attendies={this.getAttendies()}
                />
            )
        }

        return null;
    }

    renderStatus = () => {
        return (
            <Fragment>
                <Attended className="animated fadeIn row">
                    {this.renderCheckinConunter()}
                    {this.renderCheckinPercentage()}
                </Attended>
                <CheckedinList 
                    type={this.props.type}
                    checkinID={this.props.checkinID} 
                /> 
            </Fragment>
        );
    }

    render() {
        return (
            <StyledStatus className="col s12 m12 l5 offset-l1 animated fadeIn">
                {this.renderStatus()}
            </StyledStatus>
        )
    }
}

const mapStateToProps = (state, cState) => {
    return { 
        totalMembers: state.room.activeRoom.members.length,
        activeCheckin: state.room.activeCheckins[cState.checkinID],
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        type: state.room.activeRoom.checkin.type
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinStatus);

const StyledStatus = styled.div`
    position: relative;
    padding: 2rem;
    -webkit-box-shadow: 0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    -moz-box-shadow:    0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    box-shadow:         0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    border-radius: 12px;
    background-color: #ffffff;
    min-height: 420px !important;
    text-align: center;
    margin-bottom: 5rem;

    @media screen and (max-width: 1000px) {
        margin-top: 3rem;
    }
`;

const NotActive = styled.div`
    position: absolute;
    top: 32.5%;
    left: 50%;
    transform: translate(-50%);

    h5 {
        color: #bdbdbd;
        opacity: 0.8;
        font-weight: 100;
        margin-top: 2rem;
        font-size: 1.5rem;
    }

    svg {
        stroke: #b388ff ;
        opacity: 0.4;
    }
`;

const Attended = styled.div`

    margin-top: 3rem;
    color: #bdbdbd;
    font-size: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eeeeee;

    h4 {
        font-weight: 100;
    }

    .focus {
        font-size: 4rem;
    }

    .sub {
        font-size: 1.75rem;
        opacity: 0.7;
    }

    .description {
        display: block;
        letter-spacing: 1px;
        font-size: 1.1rem;
        opacity: 0.7;
    }
`;
