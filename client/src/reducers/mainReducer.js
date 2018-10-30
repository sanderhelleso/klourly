

// MAIN APP REDUCER
const mainReducer = (state = {}, action) => {
    switch (action.type) {        

        case 'FETCH_USER_LOCATION_SUCCESS':
            return {
                ...state,
                userLocation: action.payload
            }

        default:
            return state;
    }
}

export default mainReducer;