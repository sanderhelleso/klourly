import React from "react";
import Map from "./Map";
import { geoLocationActions } from '../../../actions/geoLocationActions';

// redux
import { connect } from 'react-redux';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapKey: '',
            coords: {
                lat: 0,
                lng: 0
            }
        }
    }

    async componentWillMount() {
        this.props.geoLocationActions();
        /*await dashboard.getMapKey()
        .then(response => {
            this.setState({
                mapKey: response.data.key
            });
        });*/
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                ...this.state,
                coords: {
                    lat: nextProps.state.location.coords.latitude,
                    lng: nextProps.state.location.coords.longitude
                }
            });
        }
    }

	render() {
		return (
            <div className="animated fadeIn">
                <Map
                    coords={this.state.coords}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNzBiJTuMMvL-t4D4oD9zSBbP6Nx6rbF4&v=3.exp&libraries=geometry,drawing,places`}
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
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);