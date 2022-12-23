import axios from "axios";
import {
  CONVERSATION_RATES_REQUEST,
  SUPPORTED_CODES_REQUEST,
} from "../constants/shared/currencies-api.constants";
import currencySortComparator from "../utils/currency-sort-comporator";
import { FAVORITE_CURRENCY_KEY } from "../constants/shared/storage-currency.constants";
import {
  loading,
  add_currency_to_favorite,
  get_currencies_error,
  get_currencies_success,
  remove_currency_from_favorite,
} from "../redux/reducers/currency-list-reducer";
import { AppDispatch } from "../redux/store";

export const getCurrencies = (base_code: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loading());
    axios
      .all([
        axios.get(SUPPORTED_CODES_REQUEST),
        axios.get(CONVERSATION_RATES_REQUEST + base_code),
      ])
      .then(
        axios.spread((get_codes_result, get_rates_result) => {
          const storageFavoriteCurrency = localStorage.getItem(FAVORITE_CURRENCY_KEY) ?? null;
          const favorite_currencies = storageFavoriteCurrency ?
            JSON.parse(storageFavoriteCurrency) : [];
          const currencies_array = get_codes_result?.data?.supported_codes
            ?.map(([key, value]: string) => ({
              code: key,
              name: value,
              rate: get_rates_result?.data?.conversion_rates[key],
              isFavorite: favorite_currencies?.includes(key),
            }))
            .sort(currencySortComparator);

          dispatch(
            get_currencies_success({
              currencies: currencies_array,
            }),
          );
        }),
      )
      .catch(() => dispatch(get_currencies_error()));
  };
};

export const addToFavorite = (favoriteCurrencyCode: string) => {
  return async (dispatch: AppDispatch) => {
    const storageFavoriteCurrency = localStorage.getItem(FAVORITE_CURRENCY_KEY) ?? null;

    let favorite_currencies = storageFavoriteCurrency ?
      JSON.parse(storageFavoriteCurrency) :
      [];
    if (favorite_currencies) {
      favorite_currencies = [...favorite_currencies, favoriteCurrencyCode];
    } else {
      favorite_currencies = [favoriteCurrencyCode];
    }
    localStorage.setItem(
      FAVORITE_CURRENCY_KEY,
      JSON.stringify(favorite_currencies),
    );
    dispatch(
      add_currency_to_favorite({
        favoriteCurrencyCode,
      }),
    );
  };
};

export const removeFromFavorite = (favoriteCurrencyCode: string) => {
  return async (dispatch: AppDispatch) => {
    const storageFavoriteCurrency = localStorage.getItem(FAVORITE_CURRENCY_KEY) ?? null;

    let favorite_currencies = storageFavoriteCurrency ?
      JSON.parse(storageFavoriteCurrency) :
      [];
    if (favorite_currencies) {
      favorite_currencies = favorite_currencies.filter(
        (value: string) => value !== favoriteCurrencyCode,
      );
    } else {
      favorite_currencies = [];
    }
    localStorage.setItem(
      FAVORITE_CURRENCY_KEY,
      JSON.stringify(favorite_currencies),
    );
    dispatch(
      remove_currency_from_favorite({
        favoriteCurrencyCode,
      }),
    );
  };
};
