import React from 'react';
import {geolocated} from 'react-geolocated';
import { geoLocationActions } from '../../../actions/geoLocationActions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
 
class GeoLocation extends React.Component {
    constructor(props) {
        super(props);
    }

    //this.props.geoLocationActions(this.props.cords)
    render() {
        return !this.props.isGeolocationAvailable
        ? <p>Your browser does not support Geolocation</p>
        : !this.props.isGeolocationEnabled
            ? <p>Geolocation is not enabled</p>
            : this.props.coords
            ? <table>
                <tbody>
                <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
                <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
                <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
                </tbody>
            </table>
            : <div>Getting the location data&hellip; </div>;
    }
}

// update current geolocation state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ geoLocationActions }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(GeoLocation));