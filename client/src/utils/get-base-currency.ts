import { BASE_CURRENCIES, BASE_CURRENCY_CONVERT_KEY } from "../constants/shared/storage-currency.constants";
import { ICurrencySelect } from "../types/currency-converter/currency-converter-select";
import { getLocation } from "../services/get-currency-by-location";

const getBaseCurrency = async () => {
  const storageBaseCurrencyConvert = localStorage.getItem(
    BASE_CURRENCY_CONVERT_KEY,
  );
  const savedBaseCurrencyConvert = storageBaseCurrencyConvert
    ? JSON.parse(storageBaseCurrencyConvert)
    : null;
  let newBaseCurrency: ICurrencySelect;
  if (savedBaseCurrencyConvert) {
    if (
      savedBaseCurrencyConvert?.currency_from ===
      savedBaseCurrencyConvert?.currency_to
    ) {
      newBaseCurrency = {
        currency_from: savedBaseCurrencyConvert?.currency_from,
        currency_to:
          savedBaseCurrencyConvert?.currency_from === BASE_CURRENCIES.USD
            ? BASE_CURRENCIES.EUR
            : BASE_CURRENCIES.USD,
      };
    } else {
      newBaseCurrency = {
        currency_from:
          savedBaseCurrencyConvert?.currency_from ??
          (savedBaseCurrencyConvert?.currency_to === BASE_CURRENCIES.USD
            ? BASE_CURRENCIES.EUR
            : BASE_CURRENCIES.USD),
        currency_to:
          savedBaseCurrencyConvert?.currency_to ??
          (savedBaseCurrencyConvert?.currency_from === BASE_CURRENCIES.EUR
            ? BASE_CURRENCIES.USD
            : BASE_CURRENCIES.EUR),
      };
    }
  } else {
    const baseCurrencyByLocation = await getLocation();
    newBaseCurrency = {
      currency_from: baseCurrencyByLocation,
      currency_to:
        baseCurrencyByLocation === BASE_CURRENCIES.USD
          ? BASE_CURRENCIES.EUR
          : BASE_CURRENCIES.USD,
    };
  }
  return newBaseCurrency;
};

export default getBaseCurrency;