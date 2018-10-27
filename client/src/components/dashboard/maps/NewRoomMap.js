import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapMarker from "./MapMarkers";

const NewRoomMap = withScriptjs(withGoogleMap((props) =>{
    console.log(props);
                  
    return (
        <div id="maps-cont">
            <GoogleMap
                defaultZoom={14}
                center={ { lat:  props.results.lat, lng: props.results.lng } }
                >
            </GoogleMap>
        </div>
        );
    }
));

export default NewRoomMap;