
const dashboardReducer = (state = {}, action) => {

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

        case 'NEW_ROOM_STAGE':
            return {
                ...state,
                newRoom: action.payload.reset 
                    ? { stage: 0 }
                    : {
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
                        owning: action.payload
                    }
                }
            }

        default:
            return state;
    }
}

export default dashboardReducer;