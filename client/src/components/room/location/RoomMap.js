import React from 'react';
import { compose } from 'recompose';
import { withGoogleMap, withScriptjs, GoogleMap, Marker} from 'react-google-maps';

const RoomMap = compose(withScriptjs, withGoogleMap) 
(props =>
    <div>
        <div id="newRoom-map-cont">
            <div id="room-map">
                <GoogleMap
                    defaultZoom={14}
                    center={{ lat: props.coords.lat, lng: props.coords.lng }}
                >
                    <Marker position={{ lat: props.coords.lat, lng: props.coords.lng }} />
                </GoogleMap>
            </div>
        </div>
    </div>
);

export default RoomMap;