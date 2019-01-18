import React, { Component } from 'react';
import styled from 'styled-components';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker'
import { ReverseGeocoder } from 'open-street-map-reverse-geo-node-client';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';


class SelectLocationMap extends Component {
    constructor(props) {
        super(props);

        // initial map config
        this.MAP_WIDHT = 600;
        this.MAP_HEIGHT = 400;
        this.DEFAULT_ZOOM = 14;

        // geocoder and coords
        this.geo = new ReverseGeocoder();
        this.fallbackCoords = [37.386051, -122.083855]; // Mountain View ;)
        this.coords = this.props.userLocation 
                    ? [this.props.userLocation.latitude, this.props.userLocation.longitude]
                    : this.fallbackCoords;

        this.state = { 
            locationName: '',
            loading: false,
            markerCoords: this.coords
         }

    }

    componentDidMount() {
        this.reverseGeoCode(this.coords);
    }

    reverseGeoCode = async latLng => {

        // get address from coords
        this.setState({ 
            loading: true,
            markerCoords: latLng
        });
        const result = await this.geo.getReverse(latLng[0], latLng[1]);

        // update results location
        if (result) this.props.nextStageAction({ locationAddress: result.displayName });

    }

    renderMap() {

    }

    render() {
        return (
            <StyledMapCont>
                <Map 
                    center={this.state.markerCoords} 
                    zoom={this.DEFAULT_ZOOM} 
                    width={this.MAP_WIDHT} 
                    height={this.MAP_HEIGHT}
                    onClick={(e) => this.reverseGeoCode(e.latLng)}
                >
                    <Marker 
                        anchor={this.state.markerCoords}
                        payload={1} 
                    />
                </Map>
            </StyledMapCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        userLocation: state.location.coords
    };
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectLocationMap);

const StyledMapCont = styled.div`

    text-align: center;
    line-height: 50px;
    margin-top: 5rem;

    div {
        box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
        border-radius: 18px;
    }

    .pigeon-attribution {
        display: none;
    }
`;