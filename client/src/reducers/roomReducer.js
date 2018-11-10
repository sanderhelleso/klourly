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

        case 'UPDATE_ROOM_NAME_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    name: action.payload
                }
            }

        case 'UPDATE_ROOM_TYPE_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    type: action.payload
                }
            }
            
        default:
            return state;
    }
}

export default roomReducer;