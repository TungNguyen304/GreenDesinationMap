const initState = {
    show: false
}

export const bigboxReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SETSHOWHIDDEN': {
                return {
                    ...state,
                    show: action.payload
                }
            }
        case 'SETSHOWDISPLAY': {
            return {
                ...state,
                show: action.payload
            }
        }
        default: return state
    }
}