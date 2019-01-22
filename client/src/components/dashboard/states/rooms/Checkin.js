import React, { Component } from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { CheckCircle } from 'react-feather';
import { getWeek } from '../../../../helpers/getWeek';

import { format } from '../../../../helpers/format';
import { roomAvailableForCheckin } from '../../../../helpers/roomAvailableForCheckin';

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

        this.state = { available: false, loading: false };
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {

        // check if room is available for checkin
        if (nextProps.availableForCheckin && nextProps.availableForCheckin.active) {
            this.setState({ available: true });
        }

        else this.setState({ available: false });
    }

    registerAttendence = async () => {

        // disable button while performing request
        this.setState({ loading: true });

        // attempt to register attendence
        const response = await attendence.registerAttendence(
                        this.props.userID, this.props.roomID);

        if (response.data.success) {

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: false
            });

            // update users checked in rooms
            this.props.updateUsersCheckedinRoomsAction({
                roomID: this.props.roomID,
                checkinID: this.state.checkinID
            });

            // update users attendence percentage for room
            const updatedTotal = this.props.attendence[this.props.roomID].totalUserCheckinsForRoom + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.roomID,
                attendenceData: {
                    ...this.props.attendence[this.props.roomID],
                    totalUserCheckinsForRoom: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        updatedTotal,
                        this.props.attendence[this.props.roomID].totalRoomCheckins
                    )
                }
            });
        } 

        // finish loading
        this.setState({ loading: false });
    }



    renderCheckIn() {

        // only render check in button if not owner
        if (this.state.available) {

            // check if room is currently available for checkin 
            return (
                <CheckinRoomButton 
                    className={`waves-effect waves-light btn-flat animated 
                    ${this.state.available ? 'fadeIn' : 'fadeOut'}`}
                    onClick={this.registerAttendence}
                    disabled={this.state.loading}
                >
                    <CheckCircle />
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
        attendence: state.room.attendence
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


const CheckinRoomButton = styled.a`
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;