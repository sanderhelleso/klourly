import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../.././../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Activate extends Component {
    constructor(props) {
        super(props);

        this.activateRoom = this.activateRoom.bind(this);
    }

    async activateRoom() {

        const response = await room.activateRoom(
                            this.props.userID, 
                            this.props.roomID, 
                            this.props.currentLocation
                        );

        console.log(response);
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);