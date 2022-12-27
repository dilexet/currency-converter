import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import currencySortComparator from "../../utils/currency-sort-comporator";
import { fetchCurrencies } from "../../services/currency-list-actions";
import { ICurrenciesObject } from "../../types/currency-list/currency-list-component-props";
import { RootState, store } from "../store";

export const currenciesAdapter = createEntityAdapter<ICurrenciesObject>({
  selectId: (currency) => currency.code,
  sortComparer: currencySortComparator,
});

const initialState = currenciesAdapter.getInitialState({ loadingStatus: "loading", error: "" });

const currencyListSlice = createSlice({
  name: "currency-list",
  initialState: initialState,
  reducers: {
    add_currency_to_favorite: currenciesAdapter.updateOne,
    remove_currency_from_favorite: currenciesAdapter.updateOne,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencies.pending.type,
        (state) => {
          state.loadingStatus = "loading";
          state.error = "";
        })
      .addCase(fetchCurrencies.fulfilled.type,
        (state, action: PayloadAction<ICurrenciesObject[]>) => {
          state.loadingStatus = "idle";
          state.error = "";
          currenciesAdapter.setAll(state, action.payload);
        })
      .addCase(fetchCurrencies.rejected.type, (state, action: PayloadAction<string>) => {
        state.loadingStatus = "failed";
        state.error = action.payload;
        currenciesAdapter.setAll(state, []);
      });
  },
});

export default currencyListSlice.reducer;
export const {
  add_currency_to_favorite,
  remove_currency_from_favorite,
} = currencyListSlice.actions;

const currencySelectors = currenciesAdapter.getSelectors<RootState>(
  state => state.currency);

export const {
  selectAll,
  selectEntities,
  selectTotal,
  selectIds,
  selectById,
} = currencySelectors;