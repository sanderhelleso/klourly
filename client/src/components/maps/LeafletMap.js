import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class LeafletMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: [51.505, -0.09],
            markers: [[51.505, -0.09]]
        }
    }

    setMarker = (e) => {
        const { markers } = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    renderMap() {
        return (
            <Map 
            id="leaflet-map-cont" 
            center={this.state.position} 
            zoom={13}
            onClick={this.setMarker}
            >
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {this.state.markers.map((position, idx) => 
                    <Marker key={`marker-${idx}`} position={position}>
                    <Popup>
                      <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                    </Popup>
                  </Marker>
                )}
            </Map>
        )
    }

    render() {
        return this.renderMap();
    }
}
