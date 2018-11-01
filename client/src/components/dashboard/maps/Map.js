import React from "react";
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geoLocationActions } from '../../../actions/geoLocationActions';
import { newRoomLocationAction } from '../../../actions/newRoom/newRoomLocationAction';
import { newRoomAddressAction } from '../../../actions/newRoom/newRoomAddressAction';

import { store } from '../../../store';
import { notification } from "../../../helpers/notification";

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
        onMapClick: ({ isMarkerShown }) => (e) => 
        (store.dispatch(newRoomLocationAction(JSON.stringify(e.latLng))),
        {
            markerPosition: e.latLng,
            isMarkerShown: true
        })
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            getAddressFromCoords(this.props.coords).
            then(response => {
                store.dispatch(newRoomAddressAction(response));
                document.querySelector('#geoCoords-address').innerHTML = response;
            });
        },
        componentWillReceiveProps(nextProps) {
            if (this.props.markerPosition !== nextProps.markerPosition) {
                getAddressFromCoords(nextProps.markerPosition 
                ?
                JSON.parse(JSON.stringify(nextProps.markerPosition))
                : 
                nextProps.coords).
                then(response => {
                    store.dispatch(newRoomAddressAction(response));
                    document.querySelector('#geoCoords-address').innerHTML = response;
                });
            }
        }
        
    })
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
            <h5 id='geoCoords-address'></h5>
            <h5 
            id="newRoom-map-geoCoords" 
            onClick={(coords) => copyCoords(props.markerPosition 
            ? JSON.parse(JSON.stringify(props.markerPosition))
            :
            props.coords)}
            >
                <span>
                Latitude: { props.markerPosition
                ?
                JSON.parse(JSON.stringify(props.markerPosition)).lat
                :
                props.coords.lat }
                </span>
                <br />
                <span>Longitude: { props.markerPosition
                ?
                JSON.parse(JSON.stringify(props.markerPosition)).lng
                :
                props.coords.lng }
                </span>
            </h5>
        </div>
    </div>
);

async function getAddressFromCoords(coords) {

    // if coordinates are passed from map event, parse coords and set
    coords.latLng ? coords = JSON.parse(JSON.stringify(coords.latLng)) : coords;
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(coords);

    // fetch geocode from gived coordinates
    return new Promise((resolve, reject) => {
        geocoder.geocode({'latLng': latlng}, (results, status) => {

            // location fetch successfull
            if (status === window.google.maps.GeocoderStatus.OK) {
                resolve(results[1] ? results[1].formatted_address : 'No address found');
            }   
            
            else {
                // show alert here?
                resolve(`Geocoder failed due to: ${status}`);
            }
        });
    });
}

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
        geoLocationActions: () => dispatch(geoLocationActions())
    }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);