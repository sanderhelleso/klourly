import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToDash from '../../../BackToDash';
import { redirect } from '../../../../middelware/redirect';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: this.props.state.dashboard.currentRoom.roomData,
            owner: this.props.state.dashboard.currentRoom.ownerData
        }

        this.joinRoom = this.joinRoom.bind(this);
    }

    componentWillMount() {
        document.title = `${this.state.room.name} | Klourly`;
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    render() {
        return (
            <div className="container">
                <BackToDash />
                <h1>{this.state.room.name}</h1>
                <h5>{this.state.owner.name}</h5>
                <p onClick={this.joinRoom}>Invitiation Link</p>
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
