
let user = JSON.parse(localStorage.getItem('user'));
let userData = JSON.parse(localStorage.getItem('userData'));
const initialState = user ? { loggedIn: false, user, userData } : {};

const authReducer = (state = initialState, action) => {
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
        
        default:
            return state;
    }
}

export default authReducer;