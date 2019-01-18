import React, { Component } from 'react';
import styled from 'styled-components';
import Map from 'pigeon-maps';
import { room } from '../../api/room/room';
import { connect } from 'react-redux';
import { ReverseGeocoder } from 'open-street-map-reverse-geo-node-client';


class SelectLocationMap extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        this.geo = new ReverseGeocoder();
        this.fallbackCoords = [37.386051, -122.083855]; // Mountain View ;)
        this.coords = this.props.userLocation 
                    ? [this.props.userLocation.latitude, this.props.userLocation.longitude]
                    : this.fallbackCoords;

        this.state = { 
            locationName: '',
            loading: false
         }

    }

    reverseGeoCode = async latLng => {

        //const response = await room.getLocationFromCoords(this.props.userID, latLng);
        this.setState({ loading: true });
        const result = await this.geo.getReverse(latLng[0], latLng[1]);
        console.log(result);

        if (result) this.setState({ locationName: result.displayName });
    }

    renderMap() {

    }

    render() {
        return (
            <StyledMapCont>
                <Map 
                    center={this.coords} 
                    zoom={12} width={600} 
                    height={400}
                    onClick={(e) => this.reverseGeoCode(e.latLng)}
                >
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

export default connect(mapStateToProps, null)(SelectLocationMap);

const StyledMapCont = styled.div`

    text-align: center;
    line-height: 50px;

    div {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
    }
`;