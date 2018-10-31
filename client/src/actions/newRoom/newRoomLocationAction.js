
export const newRoomLocationAction= (roomData) => (
    console.log(roomData),
    {
        type: 'NEW_ROOM_LOCATION',
        payload: JSON.parse(roomData)
    }
);

const geopositionToObject = geoposition => ({
    latitude: geoposition.lat,
    longitude: geoposition.lng
});