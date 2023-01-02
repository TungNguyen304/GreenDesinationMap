const initState = {
    filter: {
        district: [],
        ward: [],
        serviceTypes: []
    }
}

export const filterReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SET_FILTER': {
            return {
                ...state,
                filter: {
                    district: action.payload.district,
                    ward: action.payload.ward,
                    serviceTypes: action.payload.type
                }
            }
        }
        default: return state
    }
}