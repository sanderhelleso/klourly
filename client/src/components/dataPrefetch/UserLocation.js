
import React, { Component } from 'react';
import styled from 'styled-components';
import { store } from '../../store/index';
import CircularLoader from '../loaders/CircularLoader';

export default class UserLocation extends Component {
    constructor(props) {
        super(props);

        this.GEO_LOCATION_OPTIONS = { 
            enableHighAccuracy: true,   // get hgihest possible accurance
            timeout: 5000,              // timeout after 5 sec
            maximumAge: 1000,           // 1 sec max age
            distanceFilter: 1           // update every 1m
        };

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
                this.setState({ gotLocation: true }, () => {
                    dispatch({
                        type: 'FETCH_USER_LOCATION_SUCCESS',
                        payload: {
                            ...this.geopositionToObject(position),
                            gotLocation: this.state.gotLocation
                        }
                    });
                })
            }, 

            // on error, attempt refetch
            error => this.handleError(error), this.GEO_LOCATION_OPTIONS);
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

    handleError = error => {
        console.log(error);
        this.setState({ gotLocation: false })
        navigator.geolocation.clearWatch(this.watchID);
        store.dispatch(this.watchLocation());
    }

    renderLocationStatus() {

        if (this.state.gotLocation) return null;

        return (
            <StyledStatus className="animated bounceInLeft">
                <div id="geoload-cont">
                    <CircularLoader size="small" />
                </div>
                <p>Fetching Location...</p>
            </StyledStatus>
        )
    }

    render() {
        return this.renderLocationStatus();
    }
}

const StyledStatus = styled.div`
    position: fixed;
    bottom: 30px;
    left: 30px;
    height: 70px;
    width: 325px;
    text-align: center;
    background-color: #ede7f6;
    border: 1px solid #d1c4e9;
    border-radius: 4px;
    font-weight: 600;
    box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
    z-index: 1000;

    &:hover {
        opacity: 0.3;
    }

    #geoload-cont {
        position: relative;
        float: left;
        height: 70px;
        width: 100px;

        .animated {
            top: 27.5% !important;
        }
    }

    p {
        margin-top: 1.55rem;
        margin-right: 1.75rem;
        font-size: 1.1rem;
        letter-spacing: 1px;
    }
`;
