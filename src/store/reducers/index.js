import { combineReducers } from "redux"
import { serviceReducer } from "./service"
import { bigboxReducer } from "./bigbox"

export const rootReducer = combineReducers({
    serviceReducer: serviceReducer,
    bigboxReducer: bigboxReducer
})

