import { combineReducers } from "redux"
import { serviceReducer } from "./service"
import { homePageReducer } from "./homePage"
import { bigboxReducer } from "./bigbox"
import { filterReducer } from "./filter"
import { searchReducer } from "./search"
import { dragReducer } from "./drag"
import { accountReducer } from "./account"

export const rootReducer = combineReducers({
    serviceReducer: serviceReducer,
    bigboxReducer: bigboxReducer,
    homePageReducer: homePageReducer,
    filterReducer: filterReducer,
    searchReducer: searchReducer,
    dragReducer: dragReducer,
    accountReducer: accountReducer
})

