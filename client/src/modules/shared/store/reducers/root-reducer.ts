import {combineReducers} from "@reduxjs/toolkit"
import currencyListReducer from "../../../currency-list/store/reducers/currency-list-reducer"
import currencyConverterReducer from "../../../currency-converter/store/reducers/currency-converter-reducer"

export const rootReducer = combineReducers({
    currency: currencyListReducer,
    converter: currencyConverterReducer
})