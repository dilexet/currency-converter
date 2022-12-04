import axios from "axios";
import {FAVORITE_CURRENCY_KEY} from "../../../shared/constants/storage-currency.constants";
import {SUPPORTED_CODES_REQUEST, CONVERSATION_RATES_REQUEST} from "../../../shared/constants/currencies-api.constants";
import currencySortComparator from "../../utils/currency-sort-comporator";
import {
    loading, get_currencies_success, get_currencies_error,
    add_currency_to_favorite, remove_currency_from_favorite
} from "../reducers/currency-list-reducer";

export const getCurrencies = (base_code) => {
    return async (dispatch) => {
        dispatch(loading())
        axios.all([
            axios.get(SUPPORTED_CODES_REQUEST),
            axios.get(CONVERSATION_RATES_REQUEST + base_code)
        ])
            .then(axios.spread((get_codes_result, get_rates_result) => {
                const favorite_currencies = JSON.parse(localStorage.getItem(FAVORITE_CURRENCY_KEY));
                const currencies_array = get_codes_result?.data?.supported_codes?.map(([key, value]) => ({
                    code: key,
                    name: value,
                    rate: get_rates_result?.data?.conversion_rates[key],
                    isFavorite: favorite_currencies?.includes(key)
                })).sort(currencySortComparator);

                dispatch(get_currencies_success({
                    currencies: currencies_array
                }))
            }))
            .catch(() => dispatch(get_currencies_error()));
    }
}

export const addToFavorite = (favoriteCurrencyCode) => {
    return async (dispatch) => {
        let favorite_currencies = JSON.parse(localStorage.getItem(FAVORITE_CURRENCY_KEY));
        if (favorite_currencies) {
            favorite_currencies = [...favorite_currencies, favoriteCurrencyCode];
        } else {
            favorite_currencies = [favoriteCurrencyCode]
        }
        localStorage.setItem(FAVORITE_CURRENCY_KEY, JSON.stringify(favorite_currencies));
        dispatch(add_currency_to_favorite(
            {
                favoriteCurrencyCode: favoriteCurrencyCode
            }));
    }
}

export const removeFromFavorite = (favoriteCurrencyCode) => {
    return async (dispatch) => {
        let favorite_currencies = JSON.parse(localStorage.getItem(FAVORITE_CURRENCY_KEY));
        if (favorite_currencies) {
            favorite_currencies = favorite_currencies.filter(value => value !== favoriteCurrencyCode);
        } else {
            favorite_currencies = []
        }
        localStorage.setItem(FAVORITE_CURRENCY_KEY, JSON.stringify(favorite_currencies));
        dispatch(remove_currency_from_favorite({
            favoriteCurrencyCode: favoriteCurrencyCode
        }));
    }
}