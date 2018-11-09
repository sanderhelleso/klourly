let userData = JSON.parse(localStorage.getItem('userData'));
let roomData = JSON.parse(localStorage.getItem('currentRoom'));
const initialState = {};
userData ? initialState.userData = userData : null;
roomData ? initialState.currentRoom = roomData : null;

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DASHBOARD_OPTION':
            return {
                ...state,
                dashboardOption: action.payload
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
                    settings: action.payload
                }
            };

        case 'USER_DATA':
            return {
                ...state,
                userData: action.payload
            };

        case 'ENTER_ROOM_SUCCESS':
            return {
                ...state,
                currentRoom: action.payload
            }

        case 'NEW_ROOM_STAGE':
            return {
                ...state,
                newRoom: {
                    ...state.newRoom,
                    ...action.payload
                }
            }
   

        case 'NEW_ROOM_LOCATION':
            return {
                ...state,
                newRoom: {
                    ...state.newRoom,
                    location: {
                        ...action.payload
                    }
                }
            }

        case 'NEW_ROOM_ADDRESS':
            return {
                ...state,
                newRoom: {
                    ...state.newRoom,
                    location: {
                        ...state.newRoom.location,
                        address: action.payload
                    }
                }
            }
        
        case 'NEW_ROOM_SUCCESS':
            return {
                ...state,
                newRoom: {},
                userData: {
                    ...state.userData,
                    rooms: {
                        ...state.userData.rooms,
                        ...action.payload
                    }
                }
            }

        case 'OPEN_ANNOUNCEMENT':
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    currentAnnouncement: action.payload
                }
            }
            
        default:
            return state;
    }
}

export default authReducer;