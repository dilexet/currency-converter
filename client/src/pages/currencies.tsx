import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { BASE_CURRENCY_KEY } from "../constants/shared/storage-currency.constants";
import { fetchCurrenciesAsync } from "../actions/currency-list-actions";
import { getLocationAsync } from "../actions/get-currency-by-location";
import CurrencyList from "../components/currency-list/currency-list";
import Loading from "../components/loading/loading";
import { selectAll } from "../redux/reducers/currency-list-reducer";

const Currencies = () => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectAll);
  const currencies_state = useAppSelector((x) => x.currency);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [baseCurrency, setBaseCurrency] = useState<string>("");

  const changeBaseCurrency = async (newBaseCurrency: string): Promise<void> => {
    await fetchData(newBaseCurrency);
    setBaseCurrency(newBaseCurrency);
    localStorage.setItem(BASE_CURRENCY_KEY, newBaseCurrency);
  };

  const fetchData = useCallback(
    async (newBaseCurrency: string) => {
      if (newBaseCurrency) {
        dispatch(fetchCurrenciesAsync(newBaseCurrency));
      } else {
        const savedBaseCurrency = localStorage.getItem(BASE_CURRENCY_KEY);
        if (savedBaseCurrency) {
          setBaseCurrency(savedBaseCurrency);
          dispatch(fetchCurrenciesAsync(savedBaseCurrency));
        } else {
          const baseCurrencyByLocation = await getLocationAsync();
          setBaseCurrency(baseCurrencyByLocation);
          dispatch(fetchCurrenciesAsync(baseCurrencyByLocation));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isLoading) {
      fetchData(baseCurrency).catch(console.error);
      setIsLoading(false);
    }
  }, [baseCurrency, fetchData, isLoading]);

  return (
    <>
      <Head>
        <title>All currencies list</title>
      </Head>
      {!isLoading ?
        <CurrencyList
          currencies={currencies}
          isLoadingState={currencies_state?.loadingStatus === "loading"}
          baseCurrency={baseCurrency}
          changeBaseCurrency={changeBaseCurrency}
        /> :
        <Loading />
      }
    </>
  );
};

export default Currencies;
