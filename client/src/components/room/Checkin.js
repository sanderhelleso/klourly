import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { attendence } from '../../api/room/attendence';
import { format } from '../../helpers/format';
import { notification } from '../../helpers/notification';
import { geo } from '../../helpers/geo';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../actions/room/checkin/checkinAvailableAction';
import { updateUsersCheckedinRoomsAction } from '../../actions/room/checkin/updateUsersCheckedinRoomsAction';

import Attendence from './Attendence';
import Signal from '../signal/Signal';


class Checkin extends Component {
    constructor(props) {
        super(props);

        this.MIN = 60000;

        this.state = { loading: false, available: false };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userLocation !== nextProps.userLocation) {
            this.validateLocationRange();
        }
    }

    componentDidMount() {
        this.validateLocationRange();
    }

    registerAttendence = async () => {

        // disable button while performing request
        this.setState({ loading: true });

        // attempt to register attendence
        const response = await attendence.registerAttendence(
            this.props.userID, this.props.activeRoomID
        );

        if (response.data.success) {

            // disable checkin mode and change button message
            this.setState({ 
                available: false,
                withinDistance: false,
                recentCheckinSuccess: true 
            }, () => {
                setTimeout(() => {
                    this.setState({ recentCheckinSuccess: false })
                }, this.MIN) // change back to default message after 1 min
            });

            // update users checked in rooms
            this.props.updateUsersCheckedinRoomsAction({
                roomID: this.props.activeRoom,
                checkinID: this.props.availableForCheckin.checkinID
            });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.activeRoomID,
                checkinData: false
            });

            // update users attendence percentage for room
            const updatedTotal = this.props.attendence.totalUserCheckinsForRoom + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.activeRoomID,
                attendenceData: {
                    ...this.props.attendence,
                    totalUserCheckinsForRoom: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        updatedTotal,
                        this.props.attendence.totalRoomCheckins
                    )
                }
            });

            // notify user
            notification.success(response.data.message);
        } 

        // finish loading
        this.setState({ loading: false });
    }

    validateLocationRange = () => {

        // validate that room is available
        const available = this.props.availableForCheckin && this.props.availableForCheckin.active;

        if (!available) {
            return this.setState({ available })
        }

        // if user location, get stats
        if (this.props.userLocation.gotLocation) {
            
            // update location state
            this.setState({
                available, 
                ...geo.isWithinDistance(
                    this.props.userLocation,
                    this.props.availableForCheckin.coords,
                    this.props.availableForCheckin.radius
                ) 
            });
        }
    }

    setButtonMessage() {

        if (this.state.recentCheckinSuccess) {
            return 'Registered';
        }

        else if (this.state.available) {
            return `Register (${this.state.distance}m away)`;
        }

        else return 'Unavailable'
    }

    renderCheckinBtn() {
        return (
            <div>
                <StyledButtonMain 
                    className="waves-effect waves-light btn animated fadeIn"
                    title="Register your attendace for this checkin"
                    disabled={
                        !this.state.available || 
                        !this.state.withinDistance || 
                        this.state.loading 
                        ? true : false
                    }
                    onClick={
                        this.state.available &&
                        this.state.withinDistance 
                        ? this.registerAttendence 
                        : null
                    }
                >
                    {this.setButtonMessage()}
                </StyledButtonMain>
            </div>
        )
    }

    renderSignal() {
        if (this.state.available) {
            return (
                <Signal 
                    accuracy={this.props.userLocation.coords.accuracy}
                    gotLocation={this.props.userLocation.gotLocation} 
                />
            )
        }

        return null;
    }

    render() {
        return (
            <CheckinCont className="col s12">
                <div id="attendance-cont">
                    <Attendence />
                    {this.renderCheckinBtn()}
                    {this.renderSignal()}
                </div>
            </CheckinCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin[state.room.activeRoom.id],
        attendence: state.room.attendence[state.room.activeRoom.id],
        userLocation: state.location
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setRoomAttendenceAction,
        checkinAvailableAction,
        updateUsersCheckedinRoomsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinCont = styled.div`
    text-align: center;
    margin-bottom: 3.5rem;
    
    #attendance-cont {
        max-width: 90%;
        margin: 0 auto;
    }
`;

