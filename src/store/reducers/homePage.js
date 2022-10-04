
const initState = {
    type: "map"
}


const homePageReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_HOME_PAGE': {
            return {
                ...state,
                type: action.payload
            }
        }
        default: return state
    }
}

export {homePageReducer}