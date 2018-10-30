

// MAIN APP REDUCER
const mainReducer = (state = {}, action) => {
    switch (action.type) {        
        
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