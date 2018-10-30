let userData = JSON.parse(localStorage.getItem('userData'));
const initialState = userData ? { userData } : {};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}

export default authReducer;