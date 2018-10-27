import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { dashboard } from '../../middelware/dashboard';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapKey : ''
        }
    }

	render() {
		return (
            <Map google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} 
                />
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{'qwewq'}</h1>
                    </div>
                    
                </InfoWindow>
            </Map>
		);
	}
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC6j8XUpTunLXSBXAss4QRtvm7aFvX7j14')
})(MapContainer);