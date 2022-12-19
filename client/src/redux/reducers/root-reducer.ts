import { combineReducers } from "@reduxjs/toolkit";
import currencyConverterReducer from "./currency-converter-reducer";
import currencyListReducer from "./currency-list-reducer";

export const rootReducer = combineReducers({
  converter: currencyConverterReducer,
  currency: currencyListReducer,
});
