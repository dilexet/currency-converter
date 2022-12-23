import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ICurrencyConverterState from "../../types/currency-converter/currency-converter-state";

const initialState: ICurrencyConverterState = {
  loadingCurrencies: true,
  loadingConversation: false,
  success: true,
  conversationResult: {
    wholePart: 0,
    remainder: "",
  },
  conversationRates: 0,
  amount: 0,
  currencies: [],
};

const currencyConverterSlice = createSlice({
  name: "currency-converter",
  initialState,
  reducers: {
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
      state.amount = action.payload.amount;
    },
    get_conversation_result_error(state) {
      state.loadingConversation = false;
      state.success = false;
      state.conversationResult = { wholePart: 0, remainder: "" };
      state.conversationRates = 0;
      state.amount = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      if (!action.payload.converter.currencies) {
        state.loadingCurrencies = false;
        state.success = false;
        state.currencies = [];
      }
      state.loadingCurrencies = false;
      state.success = true;
      state.currencies = action.payload.converter.currencies;
    });
  },
});

export default currencyConverterSlice.reducer;
export const {
  loadingConversation,
  get_conversation_result_success,
  get_conversation_result_error,
  get_currencies_success,
  get_currencies_error,
} = currencyConverterSlice.actions;
