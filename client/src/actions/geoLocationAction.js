
export const geoLocationAction = () => {
    return dispatch => {
        navigator.geolocation.watchPosition(position => {
            const geoObj = geopositionToObject(position);
            dispatch({
                type: 'FETCH_USER_LOCATION_SUCCESS',
                payload: geoObj
            });
        }, error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }
};

const geopositionToObject = geoposition => ({
    timestamp: geoposition.timestamp,
    coords: {
      accuracy: geoposition.coords.accuracy,
      latitude: geoposition.coords.latitude,
      longitude: geoposition.coords.longitude
    }
});