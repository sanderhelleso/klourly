let activeRoom = JSON.parse(localStorage.getItem('activeRoom'));
const initialState = activeRoom ? { activeRoom } : {};

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ENTER_ROOM_SUCCESS':
            return {
                ...state,
                activeRoom: action.payload
            }

        case 'OPEN_ANNOUNCEMENT':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    activeAnnouncement: action.payload
                }
            }
            
        default:
            return state;
    }
}

export default roomReducer;