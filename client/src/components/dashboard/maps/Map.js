import React from "react";
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
        onMapClick: ({ isMarkerShown }) => (e) => (console.log(e),
        {
            markerPosition: e.latLng,
            isMarkerShown: true
        })
    }),
    withScriptjs,
    withGoogleMap
) (props =>
    <div id="maps-cont">
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

export default Map;

/*function getMapPosOnClick(e) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log(lat);
        console.log(lng);
    }*/