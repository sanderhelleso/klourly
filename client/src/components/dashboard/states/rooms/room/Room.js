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

        this.state = {
            authorized: true
        }
   
        this.joinRoom = this.joinRoom.bind(this);
        this.renderRoomHeading = this.renderRoomHeading.bind(this);
        this.renderNotAuthorized = this.renderNotAuthorized.bind(this);
    }

    componentWillMount() {

        if (this.props.state.dashboard.currentRoom) {
            this.setState({
                room: this.props.state.dashboard.currentRoom.roomData,
                owner: this.props.state.dashboard.currentRoom.ownerData,
                authorized: true
            }, 
            () => {
                document.title = `${this.state.room.name} | Klourly`;
            });
        }

        else {
            const roomID = this.props.location.pathname.split('/')[3];
            dashboard.getRoom(this.props.state.auth.user.id, roomID)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        room: response.data.roomData,
                        owner: response.data.ownerData,
                        authorized: true
                    }, () => { 
                        document.title = `${this.state.room.name} | Klourly`; 
                    });
                }

                else {
                    this.setState({
                        authorized: false
                    });
                }
            });
        }
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    renderRoomHeading() {
        if (!this.state.room) {
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

    renderNotAuthorized() {
        if (!this.state.authorized) {
            return <h1>NOT ALLOWED TO BE HERE</h1>
        }

        return null;
    }

    render() {
        return (
            <div className="container">
                <BackToDash />
                {this.renderNotAuthorized()}
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
