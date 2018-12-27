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
        
        case 'UPDATE_ANNOUNCEMENT_REACTION':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    announcements: {
                        ...state.activeRoom.announcements,
                        [action.payload.id]: {
                            ...state.activeRoom.announcements[action.payload.id],
                            reactions: {
                                ...state.activeRoom.announcements[action.payload.id].reactions,
                                [action.payload.name]: action.payload.updatedReaction
                            }
                        }
                    }
                }
            }

            case 'UPDATE_ROOM_INVITE':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    invite: action.payload
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