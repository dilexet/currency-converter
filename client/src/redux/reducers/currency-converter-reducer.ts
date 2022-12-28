import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { currencyConversationAsync, getCurrenciesAsync } from "../../actions/currency-converter-actions";
import { ICurrencyConversationResult } from "../../types/currency-converter/currency-conversation-result";
import { RootState } from "../store";
import { ICurrencies } from "../../types/currency-converter/currency-object";

const initialState = {
  loadingCurrenciesStatus: "loading",
  loadingConversationStatus: "loading",
  error: "",
  conversationResult: {
    wholePart: 0,
    remainder: "",
  },
  conversationRates: 0,
  amount: 0,
};

export const currencyConverterAdapter = createEntityAdapter<ICurrencies>({
  selectId: (currency) => currency.code,
});

const initialAdapterState = currencyConverterAdapter.getInitialState(initialState);

const currencyConverterSlice = createSlice({
  name: "currency-converter",
  initialState: initialAdapterState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrenciesAsync.pending.type,
        (state) => {
          state.loadingCurrenciesStatus = "loading";
          state.error = "";
        })
      .addCase(getCurrenciesAsync.fulfilled.type,
        (state, action: PayloadAction<ICurrencies[]>) => {
          state.loadingCurrenciesStatus = "idle";
          state.error = "";
          currencyConverterAdapter.setAll(state, action.payload);
        })
      .addCase(getCurrenciesAsync.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loadingCurrenciesStatus = "failed";
          state.error = action.payload;
          currencyConverterAdapter.setAll(state, []);
        })
      .addCase(currencyConversationAsync.pending.type,
        (state) => {
          state.loadingConversationStatus = "loading";
          state.error = "";
        })
      .addCase(currencyConversationAsync.fulfilled.type,
        (state, action: PayloadAction<ICurrencyConversationResult>) => {
          state.loadingConversationStatus = "idle";
          state.error = "";
          state.conversationResult = {
            wholePart: action.payload.wholePart,
            remainder: action.payload.remainder,
          };
          state.conversationRates = action.payload.conversationRates;
          state.amount = action.payload.amount;
        })
      .addCase(currencyConversationAsync.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loadingConversationStatus = "failed";
          state.error = action.payload;
          state.conversationResult = { wholePart: 0, remainder: "" };
          state.conversationRates = 0;
          state.amount = 0;
        })
      .addCase(HYDRATE, (state, action: AnyAction) => {
        state.loadingCurrenciesStatus = "idle";
        if (!action.payload.converter.entities) {
          currencyConverterAdapter.setAll(state, []);
        }
        currencyConverterAdapter.setAll(state, action.payload.converter.entities);
      });
  },
});

export default currencyConverterSlice.reducer;

const currencyConverterSelectors = currencyConverterAdapter.getSelectors<RootState>(
  state => state.converter);

export const {
  selectAll
} = currencyConverterSelectors;