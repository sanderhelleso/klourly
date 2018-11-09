import React from "react";
import RoomMap from "./RoomMap";

// redux
import { connect } from 'react-redux';

class RoomMapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coords: {
                lat: props.state.room.activeRoom.location.latitude,
                lng: props.state.room.activeRoom.location.longitude
            }
        }
    }

	render() {
		return (
            <div className="animated fadeIn">
                <RoomMap
                    props={this.props}
                    coords={this.state.coords}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNzBiJTuMMvL-t4D4oD9zSBbP6Nx6rbF4&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div id="room-map-cont" className="col s10 offset-s1 z-depth-1" style={{ height: `300px`}} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, null)(RoomMapContainer);