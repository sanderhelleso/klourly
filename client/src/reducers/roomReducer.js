import { format } from '../helpers/format';

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

        case 'SET_INITIAL_ACTIVE_ROOM_STATUS_SUCCESS':
            return {
                ...state,
                activeCheckins: action.payload
            }

        case 'ACTIVATE_ROOM_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkin: {
                        active: true,
                        ...action.payload 
                    }
                },
            }

        case 'UPDATE_ACTIVATE_ROOM_STATUS_SUCCESS':
            return {
                ...state,
                activeCheckins: {
                    ...state.activeCheckins,
                    [action.payload.checkinID]: action.payload.checkinData
                }
            }

        case 'DEACTIVATE_ROOM_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkin: {
                        active: false
                    }
                },
                activeCheckins: format.removeByKey(state.activeCheckins, action.payload)
            }

        case 'CHECKIN_AVAILABLE':
            return {
                ...state,
                availableForCheckin: action.payload.checkinData 
                                    ? {
                                        ...state.availableForCheckin,
                                        [action.payload.roomID]: action.payload.checkinData
                                    } : state.availableForCheckin 
                                        ? format.removeByKey(
                                            state.availableForCheckin,
                                            action.payload.roomID
                                        ) : {}
            }

        case 'CHECKIN_NEED_UPDATE':
            return {
                ...state,
                attendence: {
                    ...state.attendence,
                    [action.payload.roomID]: {
                        ...state.attendence[action.payload.roomID],
                        checkin: {
                            ...state.attendence[action.payload.roomID].checkin,
                            updateNeeded: action.payload.updateNeeded
                        }
                    }
                }
            }

        case 'ENTER_ROOM_SUCCESS':
            return {
                ...state,
                loaded: true,
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
  