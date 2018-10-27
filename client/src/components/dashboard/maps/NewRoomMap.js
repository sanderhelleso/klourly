import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapMarker from "./MapMarkers";

const NewRoomMap = withScriptjs(withGoogleMap((props) =>{
                  
  return (
        <div id="maps-cont">
            <GoogleMap
                defaultZoom={14}
                center={ { lat:  42.3601, lng: -71.0589 } }
                >
            </GoogleMap>
        </div>
        );
    }
));

export default NewRoomMap;