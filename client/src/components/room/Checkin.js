import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { attendence } from '../../api/room/attendence';
import { format } from '../../helpers/format';
import { notification } from '../../helpers/notification';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../actions/room/checkin/checkinAvailableAction';
import { updateUsersCheckedinRoomsAction } from '../../actions/room/checkin/updateUsersCheckedinRoomsAction';

import Attendence from './Attendence';


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
                        this.props.userID, this.props.activeRoomID);

        if (response.data.success) {

            // update users checked in rooms
            this.props.updateUsersCheckedinRoomsAction({
                roomID: this.props.activeRoom,
                checkinID: this.props.availableForCheckin.checkinID
            });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.activeRoomID,
                checkinData: false
            });

            // update users attendence percentage for room
            const updatedTotal = this.props.attendence.totalUserCheckinsForRoom + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.activeRoomID,
                attendenceData: {
                    ...this.props.attendence,
                    totalUserCheckinsForRoom: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        updatedTotal,
                        this.props.attendence.totalRoomCheckins
                    )
                }
            });

            // notify user
            notification.success(response.data.message);
        } 

        // finish loading
        this.setState({ loading: false });
    }

    renderCheckinBtn() {

        const available = this.props.availableForCheckin && this.props.availableForCheckin.active;

        return (
            <div>
                <StyledButtonMain 
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={available ? false : true || this.state.loading}
                    onClick={this.registerAttendence}
                >
                    {available ? 'Checkin' : 'Unavailable'}
                </StyledButtonMain>
            </div>
        )
    }

    render() {
        return (
            <CheckinCont className="col s12">
                <div id="attendance-cont">
                    <Attendence />
                    {this.renderCheckinBtn()}
                </div>
            </CheckinCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin[state.room.activeRoom.id],
        attendence: state.room.attendence[state.room.activeRoom.id]
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setRoomAttendenceAction,
        checkinAvailableAction,
        updateUsersCheckedinRoomsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinCont = styled.div`
    text-align: center;
    margin-bottom: 3.5rem;
    
    #attendance-cont {
        max-width: 90%;
        margin: 0 auto;
    }
`;

