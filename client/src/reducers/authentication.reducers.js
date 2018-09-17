let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                loggedIn: true,
                user: action.user
            };
        
        case 'SIGNUP_SUCCESS':
            console.log(action);
            return {
                loggedIn: true,
                user: action.user
            }

        default:return state
    }
}