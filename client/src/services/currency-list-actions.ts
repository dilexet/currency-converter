import axios from "axios";
import { CONVERSATION_RATES_REQUEST, SUPPORTED_CODES_REQUEST } from "../constants/shared/currencies-api.constants";
import currencySortComparator from "../utils/currency-sort-comporator";
import { FAVORITE_CURRENCY_KEY } from "../constants/shared/storage-currency.constants";
import {
  add_currency_to_favorite,
  remove_currency_from_favorite,
} from "../redux/reducers/currency-list-reducer";
import { AppDispatch } from "../redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchAll",
  async (base_code: string) => {
    const response = await axios
      .all([
        axios.get(SUPPORTED_CODES_REQUEST),
        axios.get(CONVERSATION_RATES_REQUEST + base_code),
      ]).then(
        axios.spread((get_codes_result, get_rates_result) => {
          return { codes: get_codes_result, rates: get_rates_result };
        }),
      );

    const storageFavoriteCurrency = localStorage.getItem(FAVORITE_CURRENCY_KEY) ?? null;
    const favorite_currencies = storageFavoriteCurrency ?
      JSON.parse(storageFavoriteCurrency) : [];
    return response?.codes?.data?.supported_codes
      ?.map(([key, value]: string) => ({
        code: key,
        name: value,
        rate: response?.rates?.data?.conversion_rates[key],
        isFavorite: favorite_currencies?.includes(key),
      }));
    // .sort(currencySortComparator);
  },
);

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
        id: favoriteCurrencyCode,
        changes: { isFavorite: true },
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
        id: favoriteCurrencyCode,
        changes: { isFavorite: false },
      }),
    );
  };
};
