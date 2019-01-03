const initialState = {
    loaded: false,
    attendence: {}
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_ROOMS_OWNING':
            return {
                ...state,
                owningPreview: action.payload
            }

        case 'SET_ROOMS_ATTENDING':
            return {
                ...state,
                attendingPreview: action.payload
            }
        
        case 'SET_ROOM_ATTENDENCE':
            return {
                ...state,
                attendence: {
                    ...state.attendence,
                    [action.payload.roomID]: {
                        ...state.attendence[action.payload.roomID],
                        ...action.payload
                    }
                }
            }

        case 'CHECKIN_UNAVAILABLE':
            return {
                ...state,
                attendence: {
                    ...state.attendence,
                    [action.payload.roomID]: {
                        ...state.attendence[action.payload.roomID],
                        checkin: {
                            ...action.payload.checkinData
                        }
                    }
                }
            }

        case 'ENTER_ROOM_SUCCESS':
            return {
                ...state,
                loaded: true,
                activeRoom: {
                    ...action.payload
                }
            }

        case 'OPEN_ANNOUNCEMENT':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    activeAnnouncement: action.payload
                }
            }

        case 'CONFIRM_DELETE_MEMBER':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    confirmDeleteMember: action.payload
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

        case 'UPDATE_ROOM_MEMBERS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    members: action.payload
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