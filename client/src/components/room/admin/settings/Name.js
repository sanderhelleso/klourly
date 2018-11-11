import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomNameAction } from '../../../../actions/room/settings/updateRoomNameAction';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

class Name extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.state.room.activeRoom.name,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.updateRoomNameValue = this.updateRoomNameValue.bind(this);
    }

    updateRoomNameValue(e) {
        this.setState({
            name: e.target.value
        });
    }

    renderRoomName() {
        return (
            <div className="col s12 m12 l6 room-settings-col">
                <h5>Name</h5>
                <p className="settings-description">Room name of a room is what users will see and use to identify the room. A good room name clearly states what kind of event this room is for.</p>
                <div className="input-field">
                    <input placeholder="CST-238 CSUMB"
                    id="room-name"
                    type="text"
                    value={this.state.name}
                    onChange={(event) => this.updateRoomNameValue(event)}
                    />
                    <label htmlFor="room-name" className="active">Room Name</label>
                </div>
            </div>
        )
    }

    render() {
        return(
            this.renderRoomName()
        );
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomNameAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Name);