import React, { Component } from 'react';
import styled from 'styled-components';
import {  Check } from 'react-feather';
import { format } from '../../../../helpers/format';
import { notification } from '../../../../helpers/notification';
import validateDistance from '../../../../helpers/validateDistance';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { attendence } from '../../../../api/room/attendence';
import { setRoomAttendenceAction } from '../../../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../../../actions/room/checkin/checkinAvailableAction';
import { updateUsersCheckedinRoomsAction } from '../../../../actions/room/checkin/updateUsersCheckedinRoomsAction';


class Checkin extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            valid: false
        };
    }

    registerAttendence = async () => {

        // disable button while performing request
        this.setState({ loading: true });

        // attempt to register attendence
        const response = await attendence.registerAttendence(this.props.userID, this.props.roomID);

        if (response.data.success) {

            // notify user
            notification.success(response.data.message);

            // update users checked in rooms
            this.props.updateUsersCheckedinRoomsAction({
                roomID: this.props.roomID,
                checkinID: this.props.availableForCheckin.checkinID
            });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: false
            });

            // handle first ever attending
            if (!this.props.attendence) {
                return this.props.setRoomAttendenceAction({
                    roomID: this.props.roomID,
                    attendenceData: {
                        totalUserCheckinsForRoom: 0,
                        attendenceInPercentage: format.getPercentage(0, 1)
                    }
                });
            }

            // update users attendence percentage for room
            const updatedTotal = this.props.attendence.totalUserCheckinsForRoom + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.roomID,
                attendenceData: {
                    ...this.props.attendence,
                    totalUserCheckinsForRoom: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        updatedTotal,
                        this.props.attendence.totalRoomCheckins
                    )
                }
            });
        } 

        // finish loading
        this.setState({ loading: false });
    }

    renderCheckIn() {

        // only render check in button if not owner
        // and if room is currently available for checkin 
        if (this.props.availableForCheckin && this.props.availableForCheckin.active) {

            // validate that user is within distance of sat radius
            const withinDistance = validateDistance(
                this.props.availableForCheckin, this.props.currentUserLocation
            );

            return (
                <CheckinRoomButton 
                    className="waves-effect waves-light btn animated bounceIn"
                    onClick={withinDistance ? this.registerAttendence : null} // to handle DOM manip by client
                    disabled={this.state.loading || !withinDistance}
                    title="Checkin to room"
                >
                    <Check />
                </CheckinRoomButton>
            );
        }
        
        return null;
    }

    render() {
        return this.renderCheckIn();
    }
}

const mapStateToProps = (state, compProps) => {
    return { 
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin[compProps.roomID],
        attendence: state.room.attendence[compProps.roomID],
        currentUserLocation: state.location
    };
};

// update created room state
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        setRoomAttendenceAction,
        checkinAvailableAction,
        updateUsersCheckedinRoomsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinRoomButton = styled.button`
    opacity: ${props => props.available ? 1 : 0};
    bottom: 55%;
    background-color: #12e2a3;
    border-radius: 50%;
    position: absolute;
    bottom: -15px;
    left: -15px;
    min-height: 65px;
    min-width: 65px;
    max-height: 65px;
    max-width: 65px;
    color: #ffffff;
    box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);

    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);
        background-color: #12e2a3;
    }

    svg {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);            
        height: 30px;
        width: 30px;
        opacity: 0.8;
    }
`;