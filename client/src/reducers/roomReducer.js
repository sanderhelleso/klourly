import { format } from '../helpers/format';

const initialState = {
    loaded: false,
    availableForCheckin: {},
    usersCheckedinRooms: {},
    attendence: {}
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {

        /**
         * ROOM SETUP
        */

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
                    [action.payload.roomID]: action.payload.attendenceData
                }
            } 

        /**
         * ACTIVATE / ACTIVE ROOM
        */

        case 'SET_INITIAL_ACTIVE_ROOM_STATUS_SUCCESS':
            return {
                ...state,
                availableForCheckin: action.payload
            }

        case 'ACTIVATE_ROOM_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkin: {
                        ...state.activeRoom.checkin,
                        ...action.payload,
                        active: true
                    }
                },
            }

        case 'SET_MEMBERS_DATA':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    membersData: action.payload
                },
            }

        case 'UPDATE_ROOM_RADIUS_FOR_CHECKIN':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkin: {
                        ...state.activeRoom.checkin,
                        radius: action.payload
                    }
                }
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
                        active: false,
                        radius: state.activeRoom.checkin.radius
                    }
                },
                activeCheckins: format.removeByKey(state.activeCheckins, action.payload)
            }

        case 'SET_NEW_REPORT':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkins: {
                        ...state.activeRoom.checkins,
                        [action.payload.checkinID]: action.payload.checkinData
                    }
                }
            }

        case 'RESET_CHECKIN_AVAILABLE':
            return {
                ...state,
                availableForCheckin: {}
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

        case 'SET_USERS_CHECKEDIN_ROOMS':
            return {
                ...state,
                usersCheckedinRooms: action.payload
            }

        case 'UPDATE_USERS_CHECKEDIN_ROOMS':
            return {
                ...state,
                usersCheckedinRooms: {
                    ...state.usersCheckedinRooms,
                    [action.payload.roomID]: {
                        ...state.usersCheckedinRooms[action.payload.roomID],
                        [action.payload.checkinID]: true
                    }
                }
            }

        case 'ENTER_ROOM_SUCCESS':
            return {
                ...state,
                loaded: true,
                activeRoom: {
                    ...action.payload,
                    newAnnouncement: {}
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

        case 'UPDATE_ROOM_INVITE':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    invite: action.payload
                }
            }

        case 'UPDATE_INVITE_ROOM_MEMBERS_MODAL':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    openInviteMembersModal: action.payload
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

        /**
         * REPORTS
         */

        case 'SET_ROOM_REPORTS_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    checkins: action.payload,
                    reports: {
                        loaded: true,
                        options: {
                            index: 0,
                            filter: {
                                by: 'Most Recent',
                                time: null
                            }
                        }
                    }
                }
            }

        case 'UPDATE_ROOM_REPORTS_INDEX':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    reports: {
                        ...state.activeRoom.reports,
                        options: {
                            ...state.activeRoom.reports.options,
                            index: action.payload
                        }
                    }
                }
            }

        case 'UPDATE_ROOM_REPORTS_FILTER':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    reports: {
                        ...state.activeRoom.reports,
                        options: {
                            index: 0,
                            filter: action.payload
                        }
                    }
                }
            }

        case 'UPDATE_REPORTS_PAGINATION_LENGTH':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    reports: {
                        ...state.activeRoom.reports,
                        paginationLength: action.payload
                    }
                }
            }

        case 'SET_ROOM_MEMBERS_DATA_SUCCESS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    membersData: action.payload
                }
            }

        case 'SET_SPECIFIC_CHECKIN_REPORT':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    activeReport: action.payload
                }
            }

        
        /**
         * ANNOUNCEMENTS
         */

        case 'UPDATE_ANNOUNCEMENT_REACTIONS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    announcements: {
                        ...state.activeRoom.announcements,
                        [action.payload.announcementID]: {
                            ...state.activeRoom.announcements[action.payload.announcementID],
                            reactions: action.payload.updatedReactions
                        }
                    }
                }
            }

        case 'UPDATE_ANNOUNCEMENT_COMMENTS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    announcements: {
                        ...state.activeRoom.announcements,
                        [action.payload.announcementID]: {
                            ...state.activeRoom.announcements[action.payload.announcementID],
                            comments: {
                                ...state.activeRoom.announcements[action.payload.announcementID].comments,
                                ...action.payload.updatedComments
                            }
                        }
                    }
                }
            }

        case 'ADD_ANNOUNCEMENT_POLL':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    newAnnouncement: {
                        ...state.activeRoom.newAnnouncement,
                        ...action.payload
                    }
                }
            }

        case 'REMOVE_ANNOUNCEMENT_POLL':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    newAnnouncement: {}
                }
            }

        case 'UPDATE_ANNOUNCEMENTS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    announcements: !action.payload.updatedAnnouncements 
                    ? {} 
                    : {
                        ...state.activeRoom.announcements,
                        ...action.payload.updatedAnnouncements
                    }
                }
            }

        case 'LOAD_NEW_ANNOUNCEMENTS':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    fetcingNextAnnoucements: action.payload
                }
            }   

        case 'VOTE_ANNOUNCEMENT_POLL':
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    announcements: {
                        ...state.activeRoom.announcements,
                        [action.payload.announcementID]: {
                            ...state.activeRoom.announcements[action.payload.announcementID],
                            poll: {
                                ...state.activeRoom.announcements[action.payload.announcementID].poll,
                                voted: action.payload.voted
                            }
                        }
                    }
                }
            }
            
        default:
            return state;
    }
}

export default roomReducer;
  