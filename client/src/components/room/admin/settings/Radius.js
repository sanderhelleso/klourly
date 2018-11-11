import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomTypeAction } from '../../../../actions/room/settings/updateRoomTypeAction';

const staticTxt = {
    heading: 'Radius',
    description: 'The radius of a room is what controlls where and how close a user need to be to be able to checkin into a room. The radius is spreading from the location the room became active.'
}

class Radius extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: this.props.state.room.activeRoom.radius,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }
    }

    renderRadiusOptions() {
        return (
            <div className="col s12 m6 l6 room-settings-col">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
            </div> 
        );
    }

    render() {
        return this.renderRadiusOptions();
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius);