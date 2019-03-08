import React, { Component } from 'react';
import { StyledButtonMain } from '../../../styles/buttons';
import * as firebase from 'firebase';
import { notification } from '../.././../../helpers/notification';
import { room } from '../../.././../api/room/room';
import { token } from '../../.././../api/messaging/token';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateActiveCheckinStatusAction } from '../../../../actions/room/checkin/updateActiveCheckinStatusAction';
import { activateCheckinAction } from '../../../../actions/room/checkin/activateCheckinAction';

class Activate extends Component {
    constructor(props) {
        super(props);

        this.NO_LOCATION_ERROR = 'Unable to activate room with radius because we are unable to fetch your location. Please try again';

        this.state = { loading: false }
    }

    activateRoom = async () => {

        // if no location, alert user that unable to activate room
        if (!this.props.gotLocation) return notification.error(this.NO_LOCATION_ERROR);

        this.setState({ loading: true })

        // attempt to activate the current room
        const response = await room.activateRoom(
            this.props.userID, this.props.roomID, 
            this.props.currentLocation, this.props.radiusOption
        );
        
        // validate that checkin was successfully started
        if (response.data.success) {

            // get checkin ref of newly generated checkin
            const checkinID = response.data.checkinData.checkinID;
            const path = `rooms/${this.props.roomID}/checkins/${checkinID}`;
            const checkinRef = firebase.database().ref(path);

            // update rooms checking state and activate room for members
            this.props.activateCheckinAction({
                ...response.data.checkinData,
                coords: this.props.currentLocation
            });

            // on value change, update checkin status state
            checkinRef.on('value', snapshot => {

                // update the checkin state of the created checking ref
                this.props.updateActiveCheckinStatusAction({
                    checkinID,
                    checkinData: {
                        ...snapshot.val(),
                        totalMembers: response.data.checkinData.totalMembers,
                        membersData: response.data.checkinData.membersData,
                        membersList: response.data.checkinData.membersList
                    }
                });
            });

            // send push notifications to subscribed room members
            token.getRoomMembersToken(
                this.props.userID, 
                response.data.checkinData.membersList, 
                this.props.notificationData
            );
        }

        // notify user about potensial errors
        else notification.error(response.data.message);

        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="col s12">
                <StyledButtonMain
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={this.props.active || this.state.loading}
                    onClick={!this.props.active ? this.activateRoom : null}
                >
                    Activate
                </StyledButtonMain>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.user.id,
        activeCheckin: state.room.activeRoom.checkin,
        roomID: state.room.activeRoom.id,
        radiusOption: state.room.activeRoom.checkin.radius,
        gotLocation: state.location.gotLocation,
        currentLocation: state.location.coords,
        notificationData: {
            title: 'Room available for checkin',
            body: `"${state.room.activeRoom.name}" just opened for checkin. Register your attendence now!`,
            icon: state.room.activeRoom.cover.small,
            click_action: `http://localhost:3000/dashboard/rooms/${state.room.activeRoom.id}?checkin`
        }
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateActiveCheckinStatusAction, activateCheckinAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);