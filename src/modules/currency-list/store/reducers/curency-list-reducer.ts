import {createSlice} from "@reduxjs/toolkit"
import {CurrenciesObject} from "../../types/currency-list-component-props";
import currencySortComparator from "../../utils/currency-sort-comporator";

interface CurrencyListState {
    loading: boolean,
    success: boolean,
    currencies: CurrenciesObject[],
}

const initialState: CurrencyListState = {
    loading: true,
    success: true,
    currencies: []
}

const currencyListSlice = createSlice({
    name: "currency-list",
    initialState: initialState,
    reducers: {
        loading(state) {
            state.loading = true;
            state.success = false;
        },
        get_currencies_success(state, action) {
            state.loading = false;
            state.success = true;
            state.currencies = action.payload.currencies;
        },
        get_currencies_error(state) {
            state.loading = false;
            state.success = false;
            state.currencies = [];
        },
        add_currency_to_favorite(state, action) {
            state.currencies = state.currencies.map(currency =>
                currency?.code !== action.payload?.favoriteCurrencyCode ?
                    currency :
                    {...currency, isFavorite: true}
            ).sort(currencySortComparator);
        },
        remove_currency_from_favorite(state, action) {
            state.currencies = state.currencies.map(currency =>
                currency?.code !== action.payload?.favoriteCurrencyCode ?
                    currency :
                    {...currency, isFavorite: false}
            ).sort(currencySortComparator);
        }
    }
})


export default currencyListSlice.reducer;
export const {
    loading, get_currencies_success, get_currencies_error,
    add_currency_to_favorite, remove_currency_from_favorite
} = currencyListSlice.actions;