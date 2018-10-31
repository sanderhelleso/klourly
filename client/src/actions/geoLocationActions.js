
export const geoLocationActions = () => {
    return dispatch => {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition((position) => {
            const positionObj = geopositionToObject(position);
            dispatch({
                type: 'FETCH_USER_LOCATION_SUCCESS',
                payload: positionObj
            }),
            dispatch({
                type: 'NEW_ROOM_LOCATION',
                payload: {
                    latitude: positionObj.coords.latitude,
                    longitude: positionObj.coords.longitude
                }
            })
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