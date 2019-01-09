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

        this.state = { available: false }
    }

    componentWillReceiveProps(nextProps) {

        // check if room is available for checkin
        if (!nextProps.availableForCheckin.hasOwnProperty(this.props.roomID)) {
            this.setState({ available: false });
        }
    }

    async componentDidMount() {

        // get room reference
        const roomRef = firebase.database().ref(`rooms/${this.props.roomID}`);

        // on value change, update state and set checkin mode depending on result
        roomRef.child('/checkin').on('value', snapshot => {

            // validate if user has already checked into room for this checkin
            if (this.props.usersCheckedinRooms[this.props.roomID] &&
                this.props.usersCheckedinRooms[this.props.roomID]
                .hasOwnProperty(snapshot.val().checkinID)) return;

            // set available
            this.setState({ 
                available: snapshot.val().active,
                checkinID: snapshot.val().checkinID
            });
        
            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: snapshot.val().active ? snapshot.val() : false
            });
        });

        // on new checkin, update total potensial attendence
        let initialDataLoaded = false;
        roomRef.child('/checkins').once('value', snapshot => {
            initialDataLoaded = true;
        });

        // on new checkin, update total potensial attendence
        roomRef.child('/checkins').limitToLast(1).on('child_added', snapshot => {
            if (!initialDataLoaded) return;

            console.log(321);
            console.log(snapshot.val());

            const updatedTotal = this.props.attendence[this.props.roomID].totalRoomCheckins + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.roomID,
                attendenceData: {
                    ...this.props.attendence[this.props.roomID],
                    totalRoomCheckins: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        this.props.attendence[this.props.roomID].totalUserCheckinsForRoom,
                        updatedTotal
                    )
                }
            });
        });
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

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin,
        usersCheckedinRooms: state.room.usersCheckedinRooms,
        attendence: state.room.attendence
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
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