import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrencyListState } from "../../types/currency-list/currency-list-state";
import currencySortComparator from "../../utils/currency-sort-comporator";
import { fetchCurrencies } from "../../services/currency-list-actions";
import { ICurrenciesObject } from "../../types/currency-list/currency-list-component-props";

const initialState: ICurrencyListState = {
  loading: true,
  success: true,
  currencies: [],
  error: "",
};

const currencyListSlice = createSlice({
  name: "currency-list",
  initialState,
  reducers: {
    add_currency_to_favorite(state, action) {
      state.currencies = state.currencies
        .map((currency) =>
          currency?.code !== action.payload?.favoriteCurrencyCode
            ? currency
            : { ...currency, isFavorite: true },
        )
        .sort(currencySortComparator);
    },
    remove_currency_from_favorite(state, action) {
      state.currencies = state.currencies
        .map((currency) =>
          currency?.code !== action.payload?.favoriteCurrencyCode
            ? currency
            : { ...currency, isFavorite: false },
        )
        .sort(currencySortComparator);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencies.pending.type,
        (state) => {
          state.loading = true;
          state.success = false;
        })
      .addCase(fetchCurrencies.fulfilled.type,
        (state, action: PayloadAction<ICurrenciesObject[]>) => {
          state.loading = false;
          state.success = true;
          state.currencies = action.payload;
        })
      .addCase(fetchCurrencies.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = false;
        state.currencies = [];
        state.error = action.payload;
      });
  },
});

export default currencyListSlice.reducer;
export const {
  add_currency_to_favorite,
  remove_currency_from_favorite,
} = currencyListSlice.actions;
