
export const newRoomLocationAction= (roomData) => (
    {
        type: 'NEW_ROOM_LOCATION',
        payload: {
            latitude: JSON.parse(roomData).lat,
            longitude: JSON.parse(roomData).lng
        }
    }
);