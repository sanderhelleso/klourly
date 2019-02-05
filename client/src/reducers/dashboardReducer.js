
const dashboardReducer = (state = {}, action) => {

    switch (action.type) {
        case 'DASHBOARD_OPTION':
            return {
                ...state,
                dashboardOption: action.payload
            };

        case 'TOGGLE_ACTIVE_TAB':
            return {
                ...state,
                dashboardActiveRoomTab: action.payload
            };

        case 'AVATAR_UPDATE':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    settings: {
                        ...state.userData.settings,
                        photoUrl: action.payload
                    }
                }
            };
        
        case 'SETTINGS_UPDATE':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    settings: {
                        ...state.userData.settings,
                        ...action.payload
                    }
                }
            };

        case 'USER_DATA':
            return {
                ...state,
                userData: action.payload
            };

        /**
         * NEW ROOM
        */

        case 'NEW_ROOM_STAGE':
            return {
                ...state,
                newRoom: {
                    ...state.newRoom,
                    ...action.payload
                }
            }
        
        case 'NEW_ROOM_SUCCESS':
            return {
                ...state,
                newRoom: { stage: 0 },
                userData: {
                    ...state.userData,
                    rooms: {
                        ...state.userData.rooms,
                        owning: action.payload
                    }
                }
            }

        case 'RESET_NEW_ROOM_PROGRESS':
            return {
                ...state,
                newRoom: { stage: 0 }
            }

        /**
         * NOTIFICATIONS
        */

        case 'UPDATE_NOTIFICATIONS':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    notifications: {
                        ...state.userData.notifications,
                        ...action.payload
                    }
                }
            }

        default:
            return state;
    }
}

export default dashboardReducer;