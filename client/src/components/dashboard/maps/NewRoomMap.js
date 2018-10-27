import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from "./MapMarkers";

const NewRoomMap = withScriptjs(withGoogleMap((props) =>{
                  
  return (
        <GoogleMap
            defaultZoom={14}
            center={ { lat:  42.3601, lng: -71.0589 } }
            >
        </GoogleMap>
        );
    }
));

export default NewRoomMap;