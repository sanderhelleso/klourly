import React, { Component } from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { CheckCircle } from 'react-feather';
import { getWeek } from '../../../../helpers/getWeek';
import { roomAvailableForCheckin } from '../../../../helpers/roomAvailableForCheckin';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { attendence } from '../../../../api/room/attendence';
import { setRoomAttendenceAction } from '../../../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../../../actions/room/attendence/checkinAvailableAction';
import { updateUsersCheckedinRoomsAction } from '../../../../actions/room/attendence/updateUsersCheckedinRoomsAction'
;
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
        const roomRef = firebase.database().ref(`rooms/${this.props.roomID}/checkin`);

        // on value change, update state and set checkin mode depending on result
        roomRef.on('value', snapshot => {

            if (this.props.usersCheckedinRooms && 
                !this.props.usersCheckedinRooms[this.props.roomID]
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
        usersCheckedinRooms: state.dashboard.userData.checkins
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