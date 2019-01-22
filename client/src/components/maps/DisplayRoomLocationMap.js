import React, { Component } from 'react';
import styled from 'styled-components';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker'


export default class DisplayRoomLocationMap extends Component {
    constructor(props) {
        super(props);

        // initial map config
        this.MAP_HEIGHT = 200;
        this.MAP_WIDTH = 200;
        this.coords = Object.values(this.props.coords);
        this.state = { zoom: 13 }

    }

    setZoom = () => this.setState({ zoom: this.state.zoom < 19 ? this.state.zoom + 1 : 13 });

    render() {
        return (
            <StyledMapCont>
                <Map 
                    center={this.coords} 
                    zoom={this.state.zoom} 
                    height={this.MAP_HEIGHT}
                    width={this.MAP_WIDTH} 
                >
                    <Marker anchor={this.state.markerCoords} />
                </Map>
            </StyledMapCont>
        )
    }
}


const StyledMapCont = styled.div`

    text-align: center;
    margin-top: 4.5rem;

    div {
        box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
        border-radius: 18px;
    }

    .pigeon-attribution {
        display: none;
    }
`;