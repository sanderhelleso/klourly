import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapMarker from "./MapMarkers";

const NewRoomMap = withScriptjs(withGoogleMap((props) =>{
                  
  return (
        <div id="maps-cont">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}
                >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    }}
                />
            </StandaloneSearchBox>
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