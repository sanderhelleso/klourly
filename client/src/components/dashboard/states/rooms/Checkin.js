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

        this.state = { available: false }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.availableForCheckin.hasOwnProperty(this.props.roomID)) {
            this.setState({ available: false });
        }
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
                checkinData: snapshot.val().active ? snapshot.val() : false
            });
        });
    }

    registerAttendence = async () => {

        // disable button while performing request
        this.setState({
            loading: true
        });

        const response = await attendence.registerAttendence(this.props.userID, this.props.roomID);

        if (response.data.success) {

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: false
            });
        }
        

        // finish loading
        this.setState({
            loading: false
        });
    }



    renderCheckIn() {
        console.log(this.state);

        // only render check in button if not owner
        if (this.state.available) {

            // check if room is currently available for checkin 
            return (
                <CheckinRoomButton 
                    className={`waves-effect waves-light btn-flat animated 
                    ${this.state.available === 'not set' ? 'fadeOut' : 'fadeIn'}`}
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
        availableForCheckin: state.room.availableForCheckin
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