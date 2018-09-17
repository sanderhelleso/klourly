const reducers = (state = null, action) => {
    switch (action.type) {
        case 'EXAMPLE':
            return {
                ...state,
                examplePropOne: 'newPropOne'
            }
        
        case 'EXAMPLE-TWO':
            return {
                ...state,
                examplePropTwo: action.payload
            }
        
        default: return state;
    }
}

export default reducers;