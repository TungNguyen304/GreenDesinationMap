const initState = {
    drag: {
        isDraging: false,
        position: undefined
    }
}

export const dragReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_ISDRAGING': {
            return {
                ...state,
                drag: {
                    isDraging: action.payload.type,
                    position: action.payload.position
                }
            }
        }
        default: return state
    }
}