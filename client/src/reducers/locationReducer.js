
const locationReducer = (state = {}, action) => {
    switch (action.type) {        

        case 'FETCH_USER_LOCATION_SUCCESS':
            return {
                ...action.payload
            }

        default:
            return state;
    }
}

export default locationReducer;