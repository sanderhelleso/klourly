import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToDash from '../../../BackToDash';
import { redirect } from '../../../../middelware/redirect';
import { dashboard } from '../../../../middelware/dashboard';

class Room extends Component {
    constructor(props) {
        super(props);
   
        this.joinRoom = this.joinRoom.bind(this);
        this.renderRoomHeading = this.renderRoomHeading.bind(this);
    }

    componentWillMount() {

        if (this.props.state.dashboard.currentRoom) {
            this.setState({
                room: this.props.state.dashboard.currentRoom.roomData,
                owner: this.props.state.dashboard.currentRoom.ownerData
            }, 
            () => {
                document.title = `${this.state.room.name} | Klourly`;
            });
        }

        else {
            const roomID = this.props.location.pathname.split('/')[3];
            dashboard.getRoom(123456, roomID)
            .then(response => {
                console.log(response);
                this.setState({
                    room: response.data.roomData,
                    owner: response.data.ownerData
                }, () => {
                    document.title = `${this.state.room.name} | Klourly`;
                });
            });
        }
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    renderRoomHeading() {
        if (!this.state) {
            return null;
        }

        return (
            <div>
                <h1>{this.state.room.name}</h1>
                <h5>{this.state.owner.name}</h5>
                <p onClick={this.joinRoom}>Invitiation Link</p>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <BackToDash />
                {this.renderRoomHeading()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
