
export const newRoomLocationAction= (roomData) => (
    {
        type: 'NEW_ROOM_LOCATION',
        payload: JSON.parse(roomData)
    }
);