const initState = {
    service: []
}

export const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SERVICE_SEARCH': {
            return {
                ...state,
                service: [...action.payload]
            }
        }
        default: return state
    }
}