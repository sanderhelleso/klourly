import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
import { room } from '../../.././../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activateCheckinAction } from '../../../../actions/room/checkin/activateCheckinAction';

class Activate extends Component {
    constructor(props) {
        super(props);

        this.activateRoom = this.activateRoom.bind(this);
    }

    async activateRoom() {

        // attempt to activate the current room
        const response = await room.activateRoom(
                            this.props.userID, 
                            this.props.roomID, 
                            this.props.currentLocation
                        );
        
        console.log(response);

        // validate that checkin was successfully started
        if (response.data.success) {

            // get checkin ref of newly generated checkin
            const path = `rooms/${this.props.roomID}/checkins/${response.data.checkinData.checkinID}`;
            const checkinRef = firebase.database().ref(path);

            // on value change, log change
            checkinRef.on('value', snapshot => {
                console.log(snapshot.val());
            });

            // update the checkin state
            this.props.activateCheckinAction(response.data.checkinData.checkinID);
        }
    }

    render() {
        return (
            <div className="col s6">
                <button
                    className={`waves-effect waves-light ${this.props.active ? 'disabled-btn' : 'active-btn'}`}
                    disabled={this.props.active}
                    onClick={this.activateRoom}
                >
                    Activate
                </button>
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = state => {
    return { 
        currentLocation: state.location.coords,
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ activateCheckinAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);