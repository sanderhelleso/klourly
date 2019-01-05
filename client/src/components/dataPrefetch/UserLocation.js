
import React, { Component } from 'react';
import { store } from '../../store/index';

export default class UserLocation extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

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
                dispatch({
                    type: 'FETCH_USER_LOCATION_SUCCESS',
                    payload: this.geopositionToObject(position)
                });
            }, error => {
                console.log(error);
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

    render() {
        return null;
    }
}
