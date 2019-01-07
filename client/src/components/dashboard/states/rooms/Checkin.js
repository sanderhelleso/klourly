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
import { checkinNeedUpdateAction } from '../../../../actions/room/attendence/checkinNeedUpdateAction';

class Checkin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            available: false
        }

        this.registerAttendence = this.registerAttendence.bind(this);
    }

    async componentDidMount() {

        // get room reference
        const roomRef = firebase.database().ref(`rooms/${this.props.roomID}/checkin`);

        // on value change, update state and set checkin mode depending on result
        roomRef.on('value', snapshot => {
            this.setState({ available: snapshot.val().active });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: snapshot.val()
            });
        });

        //await this.loadCheckin();
    }

    async registerAttendence() {

        // disable button while performing request
        this.setState({
            loading: true
        });

        // attempt to register users attendence
        const response = await this.attendenceResponse(false, {
            key: this.state.key,
            day: this.state.day
        });


        // if successfull attendendce, show message and remove button
        if (response.data.success) {
            this.setState({ available: 'not set'}, () => this.removeCheckIn());

            // update attendence percentage
            const updatedUserAttendence = this.props.attendenceData[this.props.roomID].userAttended + 1;
            this.props.setRoomAttendenceAction({
                ...this.props.attendenceData[this.props.roomID],
                userAttended: updatedUserAttendence,
                attendedInPercent: Math.floor((updatedUserAttendence / this.props.attendenceData[this.props.roomID].total) * 100)
            });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: {
                    available: false
                }
            });
        }

        // finish loading
        this.setState({
            loading: false
        });
    }



    renderCheckIn() {

        // only render check in button if not owner
        if (this.state.available) {

            // check if room is currently available for checkin 
            return (
                <CheckinRoomButton 
                    className={`waves-effect waves-light btn-flat animated 
                    ${this.state.available === 'not set' ? 'bounceOut' : 'fadeIn'}`}
                    onClick={this.registerAttendence}
                    disabled={this.state.loading}
                >
                    <CheckCircle />
                </CheckinRoomButton>
            );
        }
        
        return null;
    }

    removeCheckIn() {

        // remove button after 1 sec to preserve animation
        setTimeout(() => { this.setState({ available: false }) }, 1000);
    }

    render() {
        return this.renderCheckIn();
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        attendenceData: state.room.attendence
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setRoomAttendenceAction, checkinAvailableAction, checkinNeedUpdateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinRoomButton = styled.a`
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;