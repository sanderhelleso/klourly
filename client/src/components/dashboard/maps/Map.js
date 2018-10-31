import React from "react";
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geoLocationActions } from '../../../actions/geoLocationActions';
import { newRoomLocationAction } from '../../../actions/newRoom/newRoomLocationAction';

import { store } from '../../../store';
import { notification } from "../../../helpers/notification";

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
    <div className="col s12">
        <div id="newRoom-map-cont">
            <div id="newRoom-map">
                <GoogleMap
                defaultZoom={14}
                center={props.isMarkerShown ? props.markerPosition : { lat: props.coords.lat, lng: props.coords.lng }}
                onClick={props.onMapClick}
                >
                {props.isMarkerShown && <Marker position={props.markerPosition} />}
                {props.isMarkerShown ? null : <MapMarker location={{ lat: props.coords.lat, lng: props.coords.lng }} />}
                </GoogleMap>
            </div>
            <h5 id="newRoom-map-geoCoords" onClick={(coords) => copyCoords(props.markerPosition ? JSON.parse(JSON.stringify(props.markerPosition)) : props.coords)}>
                <span>
                Latitude: { props.markerPosition ? JSON.parse(JSON.stringify(props.markerPosition)).lat :  props.coords.lat }
                </span>
                <br />
                <span>Longitude: { props.markerPosition ? JSON.parse(JSON.stringify(props.markerPosition)).lng :  props.coords.lng }
                </span>
            </h5>
        </div>
    </div>
);

// copy passed data to clipboard
function copyCoords(coords) {

    // create dummy input and append to body
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);

    // set attributes of parsed coords
    dummy.setAttribute('value', `latitude: ${coords.lat}, longitude: ${coords.lng}`);
    dummy.select();

    // copy content to clipbord and remove from DOM
    document.execCommand('copy');
    document.body.removeChild(dummy);

    // display message
    notification.copyToClipboard();
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