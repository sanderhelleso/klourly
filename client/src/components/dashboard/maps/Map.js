import React from "react";
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';

const Map = compose(withScriptjs(withGoogleMap((props) => {
    
    function getMapPosOnClick(e) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log(lat);
        console.log(lng);
    }
                  
    return  (
        <div id="maps-cont">
            <GoogleMap
                defaultZoom={14}
                defaultCenter={ { lat: props.coords.lat, lng: props.coords.lng } }
                onClick={(e) => getMapPosOnClick(e)}
            >
            <MapMarker location={  { lat: props.coords.lat, lng: props.coords.lng } } />
            </GoogleMap>
        </div>
        );
    }
)));

export default Map;