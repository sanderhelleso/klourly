import React from "react";
import NewRoomMap from "./NewRoomMap";
import { dashboard } from '../../middelware/dashboard';
import GeoLocation from './GeoLocation';
import { geoLocationActions } from '../../../actions/geoLocationActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapKey: ''
        }
    }

    async componentWillMount() {
        this.props.geoLocationActions();
        await dashboard.getMapKey()
        .then(response => {
            this.setState({
                mapKey: response.data.key
            });
        });
    }

	render() {
		return (
            <div>
                <NewRoomMap
                    results={{lat:  42.3601, lng: -71.0589}}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.mapKey}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div id="main-map-cont" style={{ height: `400px`, width: `800px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
		);
	}
}

// update current geolocation state
const mapDispatchToProps = (dispatch) => {
    return {
        geoLocationActions: () => dispatch(geoLocationActions())
    };
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);