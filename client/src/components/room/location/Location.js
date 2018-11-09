import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { MapPin } from 'react-feather';
import RoomMapContainer from './RoomMapContainer';

class Location extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <div id="room-location-cont" className="center-align">
                <RoomMapContainer />
                <h5>{this.props.state.room.activeRoom.location.address}</h5>
            </div>
        )
    }
}


// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Location);
