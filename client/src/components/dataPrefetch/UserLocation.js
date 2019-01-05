
import React, { Component } from 'react';
import { store } from '../../store/index';

export default class UserLocation extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        store.dispatch(this.watchLocation());
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    watchLocation = () => {
        return dispatch => {
            this.watchID = navigator.geolocation.watchPosition(position => {
                dispatch({
                    type: 'FETCH_USER_LOCATION_SUCCESS',
                    payload: this.geopositionToObject(position)
                });
            }, error => {},
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
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
