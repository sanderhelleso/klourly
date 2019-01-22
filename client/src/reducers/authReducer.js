

const authReducer = (state = { loggedIn: false }, action) => {
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
        
        default:
            return state;
    }
}

export default authReducer;