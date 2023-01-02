const initState = {
    user: {},
    supplier: {}
}

export const accountReducer = (state=initState, action) => {
    switch (action.type) {
        case 'SET_USER_ID': {
            return {
                ...state,
                user: {...action.payload}
            }
        }
        case 'SET_SUPPLIER_ID': {
            return {
                ...state,
                supplier: {...action.payload}
            }
        }
        default: return state
    }
}