import {createSlice} from "@reduxjs/toolkit"
import ICurrencyConverterState from "../../types/currency-converter-state";

const initialState: ICurrencyConverterState = {
    loadingCurrencies: true,
    loadingConversation: false,
    success: true,
    conversationResult: 0,
    conversationRates: 0,
    currencies: []
}

const currencyConverterSlice = createSlice({
    name: "currency-converter",
    initialState: initialState,
    reducers: {
        loadingCurrencies(state) {
            state.loadingCurrencies = true;
            state.success = false;
        },
        get_currencies_success(state, action) {
            state.loadingCurrencies = false;
            state.success = true;
            state.currencies = action.payload.currencies;
        },
        get_currencies_error(state) {
            state.loadingCurrencies = false;
            state.success = false;
            state.currencies = [];
        },
        loadingConversation(state) {
            state.loadingConversation = true;
            state.success = false;
        },
        get_conversation_result_success(state, action) {
            state.loadingConversation = false;
            state.success = true;
            state.conversationResult = action.payload.conversationResult;
            state.conversationRates = action.payload.conversationRates;
        },
        get_conversation_result_error(state) {
            state.loadingConversation = false;
            state.success = false;
            state.conversationResult = 0;
            state.conversationRates = 0;
        },
    }
})

export default currencyConverterSlice.reducer;
export const {
    loadingConversation, get_conversation_result_success, get_conversation_result_error,
    loadingCurrencies, get_currencies_success, get_currencies_error
} = currencyConverterSlice.actions;