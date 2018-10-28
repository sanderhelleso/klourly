
export const geoLocationActions = () => {
    return dispatch => {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition((position) => {
            const positionObj = geopositionToObject(position)
            dispatch({
                type: 'FETCH_USER_LOCATION_SUCCESS',
                payload: positionObj
            });
        });
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