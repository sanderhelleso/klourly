

const authReducer = (state = { loggedIn: false }, action) => {
    switch (action.type) {
        
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
        case 'UPDATE_VERIFIED_ACC_STATUS': 
            return {
                ...state,
                user: {
                    ...state.user,
                    verified: action.payload
                }
            };
        
        default: 
            return state;
    }
}

export default authReducer;