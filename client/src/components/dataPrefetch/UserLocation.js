
import React, { Component } from 'react';
import styled from 'styled-components';
import { store } from '../../store/index';

export default class UserLocation extends Component {
    constructor(props) {
        super(props);

        this.state = { gotLocation: false }
    }

    componentDidMount() {

        // on mount, fetch location
        store.dispatch(this.watchLocation());
    }

    componentWillUnmount() {

        // on unmount, remove watcher
        navigator.geolocation.clearWatch(this.watchID);
    }

    watchLocation = () => {

        // update state
        return dispatch => {

            // fetch users current location and assign ID
            this.watchID = navigator.geolocation.watchPosition(position => {
                this.setState({ gotLocation: true })
                dispatch({
                    type: 'FETCH_USER_LOCATION_SUCCESS',
                    payload: this.geopositionToObject(position)
                });
            }, error => {

                console.log(error);
                this.setState({ gotLocation: false })
                navigator.geolocation.clearWatch(this.watchID);
                store.dispatch(this.watchLocation());
            },
            { 
                enableHighAccuracy: true,   // get hgihest possible accurance
                timeout: 5000,              // timeout after 5 sec
                maximumAge: 1000,           // 1 sec max age
                distanceFilter: 1           // update every 1m
            });
        }
    };
    
    geopositionToObject = geoposition => ({
        timestamp: geoposition.timestamp,
        coords: {
          accuracy: geoposition.coords.accuracy,
          latitude: geoposition.coords.latitude,
          longitude: geoposition.coords.longitude
        }
    });

    renderLocationStatus() {

        if (this.state.gotLocation) return null;

        return (
            <StyledStatus>
                <p>Fetching Location...</p>
            </StyledStatus>
        )
    }

    render() {
        return this.renderLocationStatus();
    }
}

const StyledStatus = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50px;
    height: 50px;
    width: 100px;
    text-align: center;
    background-color: #ffffff;
`;
