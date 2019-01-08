import React, { Component } from 'react';
import * as firebase from 'firebase';
import { room } from '../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInitialActiveCheckinsAction } from '../../actions/room/checkin/setInitialActiveCheckinsAction';
import { setInitialUsersCheckedinRoomsAction } from '../../actions/room/checkin/setInitialUsersCheckedinRoomsAction';
import { updateActiveCheckinStatusAction } from '../../actions/room/checkin/updateActiveCheckinStatusAction';

class ActiveRoomsData extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // attempt to fetch users active rooms availale for checkin
        const response = await room.getActiveRooms(this.props.userID);

        console.log(response.data);

        // check if data fetch is successfull
        if (response.data.success) {

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

                    // update the checkin state of the ref
                    this.props.updateActiveCheckinStatusAction({
                        checkinID,
                        checkinData: {
                            ...snapshot.val(),
                            totalMembers: value.totalMembers, // exclude owner
                            membersData: value.membersData,
                            membersList: value.membersList
                        }
                    });
                });
            });
        }
    }

    render() {
        return null;
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
        setInitialUsersCheckedinRoomsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoomsData);
