import React, { Component } from 'react';
import * as firebase from 'firebase';
import { room } from '../../api/room/room';
import { update } from '../../helpers/update';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setInitialActiveCheckinsAction } from '../../actions/room/checkin/setInitialActiveCheckinsAction';
import { setInitialUsersCheckedinRoomsAction } from '../../actions/room/checkin/setInitialUsersCheckedinRoomsAction';
import { updateActiveCheckinStatusAction } from '../../actions/room/checkin/updateActiveCheckinStatusAction';
import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';
import { resetCheckinAvailableAction } from '../../actions/room/checkin/resetCheckinAvailableAction';

import CheckinAvailableData from './CheckinAvailableData';


class ActiveRoomsData extends Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false }
    }

    async componentDidMount() {

        // clear old checkin available state (if loaded from localstorage)
        this.props.resetCheckinAvailableAction();

        // attempt to fetch users active rooms availale for checkin
        const response = await room.getActiveRooms(this.props.userID);

        // check if data fetch is successfull
        if (response.data.success) {

            let initialRead = false;

            // update state with the fetched active checkin room
            this.props.setInitialActiveCheckinsAction(response.data.activeCheckins);
            this.props.setInitialUsersCheckedinRoomsAction(response.data.usersCheckedinRooms);

            // add listeners for each active checkin
            Object.entries(response.data.activeCheckins)
            .forEach(([checkinID, value]) => {

                // get path and ref
                const path = `rooms/${value.roomID}/checkins/${checkinID}`;
                const checkinRef = firebase.database().ref(path);

                // on value change, update checkin status state
                checkinRef.on('value', snapshot => {
                    if (!snapshot.hasChild('endTime')) {
                        if (!initialRead) {
                            update.setActiveRoom(snapshot, value.checkinData, this.props, checkinID);
                        }
                    }
    
                    else checkinRef.off('value');
                });
            });

            initialRead = true;

            this.setState({ loaded: true })
        }
    }

    renderAvailableForCheckins() {

        if (this.state.loaded) {
            return <CheckinAvailableData />
        }

        return null;
    }

    render() {
        return this.renderAvailableForCheckins()
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckins: state.room.activeCheckins,
        userID: state.auth.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        setInitialActiveCheckinsAction,
        updateActiveCheckinStatusAction ,
        setInitialUsersCheckedinRoomsAction,
        setRoomAttendenceAction,
        resetCheckinAvailableAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoomsData);
