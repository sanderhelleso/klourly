let userData = JSON.parse(localStorage.getItem('userData'));
const initialState = userData ? { userData } : {};
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
        
        case 'NEW_ROOM_SUCCESS':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    rooms: {
                        ...state.userData.rooms,
                        ...action.payload
                    }
                }
            }
            
        default:
            return state;
    }
}

export default authReducer;