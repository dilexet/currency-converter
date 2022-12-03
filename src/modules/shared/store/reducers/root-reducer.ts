import {combineReducers} from "@reduxjs/toolkit"
import currencyListReducer from "../../../currency-list/store/reducers/curency-list-reducer"

export const rootReducer = combineReducers({
    currency: currencyListReducer
})