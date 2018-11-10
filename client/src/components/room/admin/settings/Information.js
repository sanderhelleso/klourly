import React, { Component } from 'react';
import { Settings } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Type from './Type';

class Information extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.state.room.activeRoom.name,
        }

    }

    renderRoomName() {
        return (
            <div className="col s12 m6 l6">
                <h5>Name</h5>
                <p className="settings-description">Room name of a room is what users will see and use to identify the room. A good room name clearly states what kind of event this room is for.</p>
                <div className="input-field">
                    <input placeholder="CST-238 CSUMB" id="room-name" type="text" value={this.state.name} />
                    <label htmlFor="room-name">Room Name</label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="row center-align">
                <div className="s12 m12 l12 settings-row row">
                    {this.renderRoomName()}
                    <Type type={this.props.state.room.activeRoom.type} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);
