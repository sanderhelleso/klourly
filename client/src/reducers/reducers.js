
let user = JSON.parse(localStorage.getItem('user'));
let userData = JSON.parse(localStorage.getItem('userData'));
let rooms = JSON.parse(localStorage.getItem('rooms'));
const initialState = user ? { loggedIn: false, user, userData, rooms } : {};

// MAIN APP REDUCER
const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
        case 'LOGOUT_SUCCESS':
            return {
                state: action.payload
            }
        
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
        case 'VALIDATE_USER': 
            return {
                ...state,
                loggedIn: action.payload
            };
        
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
                room: action.payload
            }
        
        case 'NEW_ROOM_SUCCESS':
            return {
                ...state,
                rooms: {
                    owning: action.payload
                }
            }

        default:
            return state;
    }
}

export default reducers;