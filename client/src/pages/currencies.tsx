import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { BASE_CURRENCY_KEY } from "../constants/shared/storage-currency.constants";
import { getCurrencies } from "../services/currency-list-actions";
import { getLocation } from "../services/get-currency-by-location";
import CurrencyList from "../components/currency-list/currency-list";
import Loading from "../components/loading/loading";
import Head from "next/head";

const Currencies = () => {
  const dispatch = useAppDispatch();
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
        await dispatch(await getCurrencies(newBaseCurrency));
      } else {
        const savedBaseCurrency = localStorage.getItem(BASE_CURRENCY_KEY);
        if (savedBaseCurrency) {
          setBaseCurrency(savedBaseCurrency);
          await dispatch(await getCurrencies(savedBaseCurrency));
        } else {
          const baseCurrencyByLocation = await getLocation();
          setBaseCurrency(baseCurrencyByLocation);
          await dispatch(await getCurrencies(baseCurrencyByLocation));
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
          currencies={currencies_state.currencies}
          isLoadingState={currencies_state?.loading}
          baseCurrency={baseCurrency}
          changeBaseCurrency={changeBaseCurrency}
        /> :
        <Loading />
      }
    </>
  );
};

export default Currencies;
