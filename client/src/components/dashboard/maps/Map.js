import React from "react";
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geoLocationActions } from '../../../actions/geoLocationActions';
import { newRoomLocationAction } from '../../../actions/newRoom/newRoomLocationAction';

import { store } from '../../../store';

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
        onMapClick: ({ isMarkerShown }) => (e) => (store.dispatch(newRoomLocationAction(JSON.stringify(e.latLng))),
        {
            markerPosition: e.latLng,
            isMarkerShown: true
        })
    }),
    withScriptjs,
    withGoogleMap
) (props =>
    <div id="maps-cont animated fadeIn">
        <GoogleMap
            defaultZoom={14}
            center={props.isMarkerShown ? props.markerPosition : { lat: props.coords.lat, lng: props.coords.lng }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
            {props.isMarkerShown ? null : <MapMarker location={{ lat: props.coords.lat, lng: props.coords.lng }} />}
        </GoogleMap>
        <h5>{JSON.stringify(props.markerPosition)}</h5>
    </div>
);

function updateLocation() {
    
}

// update current geolocation state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
        geoLocationActions: () => dispatch(geoLocationActions()),
        newRoomLocationAction
    }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);