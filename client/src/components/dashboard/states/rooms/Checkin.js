import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';

import { format } from '../../../../helpers/format';

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

        this.state = { loading: false };
    }


    registerAttendence = async () => {

        // disable button while performing request
        this.setState({ loading: true });

        // attempt to register attendence
        const response = await attendence.registerAttendence(
                        this.props.userID, this.props.roomID);

        if (response.data.success) {

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
        if (this.props.availableForCheckin && 
            this.props.availableForCheckin.active) {

            return (
                <CheckinRoomButton 
                    className="waves-effect waves-light btn-flat animated fadeIn"
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
        attendence: state.room.attendence[compProps.roomID]
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
    opacity: ${props => props.available ? 1 : 0};
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;