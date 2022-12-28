import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import currencySortComparator from "../../utils/currency-sort-comporator";
import { fetchCurrenciesAsync } from "../../actions/currency-list-actions";
import { ICurrenciesObject } from "../../types/currency-converter/currency-object";
import { RootState } from "../store";

const initialState = {
  loadingStatus: "loading",
  error: "",
};
export const currenciesAdapter = createEntityAdapter<ICurrenciesObject>({
  selectId: (currency) => currency.code,
  sortComparer: currencySortComparator,
});

const initialAdapterState = currenciesAdapter.getInitialState(initialState);

const currencyListSlice = createSlice({
  name: "currency-list",
  initialState: initialAdapterState,
  reducers: {
    add_currency_to_favorite: currenciesAdapter.updateOne,
    remove_currency_from_favorite: currenciesAdapter.updateOne,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrenciesAsync.pending.type,
        (state) => {
          state.loadingStatus = "loading";
          state.error = "";
        })
      .addCase(fetchCurrenciesAsync.fulfilled.type,
        (state, action: PayloadAction<ICurrenciesObject[]>) => {
          state.loadingStatus = "idle";
          state.error = "";
          currenciesAdapter.setAll(state, action.payload);
        })
      .addCase(fetchCurrenciesAsync.rejected.type,
        (state, action: PayloadAction<string>) => {
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
} = currencySelectors;