
let user = JSON.parse(localStorage.getItem('user'));
let userData = JSON.parse(localStorage.getItem('userData'));
const initialState = user ? { loggedIn: false, user, userData } : {};

// MAIN APP REDUCER
const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
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

        case 'USER_DATA':
            return {
                ...state,
                userData: action.payload
            };

        default:
            return state;
    }
}

export default reducers;