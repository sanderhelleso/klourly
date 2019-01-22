import React, { Component } from 'react';
import * as firebase from 'firebase';

import { format } from '../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../actions/room/checkin/checkinAvailableAction';
import { updateUsersCheckedinRoomsAction } from '../../actions/room/checkin/updateUsersCheckedinRoomsAction';


class CheckinAvailableData extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // itterate over users attending room and add listeners
        console.log(this.props);
        this.props.roomsAttending.forEach(roomID => {

            // get room reference
            const roomRef = firebase.database().ref(`rooms/${roomID}`);

            // clear all previous listeners
            roomRef.off('value');
            roomRef.child('/checkins').off('value');
            roomRef.child('/checkins').off('child_added');

            // on value change, update state and set checkin mode depending on result
            roomRef.child('/checkin').on('value', snapshot => {

                // validate if user has already checked into room for this checkin
                if (this.props.usersCheckedinRooms[roomID] &&
                    this.props.usersCheckedinRooms[roomID]
                    .hasOwnProperty(snapshot.val().checkinID)) return;

                // update checkin state
                this.props.checkinAvailableAction({
                    roomID: roomID,
                    checkinData: snapshot.val().active ? snapshot.val() : false
                });
            });

            // prefetch data to only recieve callbacks on new data added
            let initialDataLoaded = false;
            roomRef.child('/checkins').once('value', snapshot => {
                initialDataLoaded = true;
            });

            // on new checkin, update total potensial attendence
            roomRef.child('/checkins')
            .orderByChild('startTime')
            .limitToLast(1)
            .on('child_added', () => {

                // if initalData is not loaded, return
                if (!initialDataLoaded) return;

                // if not, increment total room checkin and update attendence state
                const updatedTotal = this.props.attendence[roomID].totalRoomCheckins + 1;
                this.props.setRoomAttendenceAction({
                    roomID: roomID,
                    attendenceData: {
                        ...this.props.attendence[roomID],
                        totalRoomCheckins: updatedTotal,
                        attendenceInPercentage: format.getPercentage(
                            this.props.attendence[roomID].totalUserCheckinsForRoom,
                            updatedTotal
                        )
                    }
                });
            });
        });
    }

    render() {
        return null
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomsAttending: state.dashboard.userData.rooms ? state.dashboard.userData.rooms.attending : [],
        availableForCheckin: state.room.availableForCheckin,
        usersCheckedinRooms: state.room.usersCheckedinRooms,
        attendence: state.room.attendence
    };
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        setRoomAttendenceAction,
        checkinAvailableAction, 
        updateUsersCheckedinRoomsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinAvailableData);
