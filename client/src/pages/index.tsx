import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ICurrencySelect } from "../types/currency-converter/currency-converter-select";
import {
  INITIAL_AMOUNT_VALUE,
  InitialCurrencySelectState,
} from "../constants/currency-converter/initial-states";
import {
  BASE_CURRENCY_CONVERT_KEY,
} from "../constants/shared/storage-currency.constants";
import {
  currencyConversation,
  getCurrencies,
} from "../services/currency-conversation-actions";
import { formatCurrency } from "../utils/format-currency";
import CurrencyConverter from "../components/currency-converter/currency-converter";
import Loading from "../components/loading/loading";
import getBaseCurrency from "../utils/get-base-currency";

const Index = () => {
  const dispatch = useAppDispatch();
  const converter_state = useAppSelector((x) => x.converter);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(true);
  const [currencySelect, setCurrencySelect] = useState<ICurrencySelect>(
    InitialCurrencySelectState,
  );
  const [amount, setAmount] = useState<string>(INITIAL_AMOUNT_VALUE.toString());

  const handleSwapCurrencies = (): void => {
    const newBaseCurrency = {
      currency_from: currencySelect.currency_to,
      currency_to: currencySelect.currency_from,
    };
    changeAndSaveBaseCurrency(newBaseCurrency);
  };

  const changeAndSaveBaseCurrency = (
    newBaseCurrency: ICurrencySelect,
  ): void => {
    setCurrencySelect(newBaseCurrency);
    setShouldSendRequest(true);
    localStorage.setItem(
      BASE_CURRENCY_CONVERT_KEY,
      JSON.stringify(newBaseCurrency),
    );
  };

  const fetchData = useCallback(async () => {
    await dispatch(await getCurrencies());
  }, [dispatch]);

  const conversationRequest = useCallback(
    async (currencyFrom: string, currencyTo: string, amount: number) => {
      await dispatch(
        await currencyConversation(currencyFrom, currencyTo, amount),
      );
    },
    [dispatch],
  );

  const loadBaseCurrencySelect = useCallback(async () => {
    if (currencySelect === InitialCurrencySelectState) {
      const newBaseCurrency = await getBaseCurrency();
      changeAndSaveBaseCurrency(newBaseCurrency);
    }
  }, [currencySelect]);

  useEffect(() => {
    if (isLoading) {
      fetchData().catch(console.error);
      loadBaseCurrencySelect().catch(console.error);
      setIsLoading(false);
    }
  }, [isLoading, fetchData, loadBaseCurrencySelect]);

  useEffect(() => {
    if (
      shouldSendRequest &&
      amount !== "" &&
      currencySelect !== InitialCurrencySelectState
    ) {
      conversationRequest(
        currencySelect?.currency_from,
        currencySelect?.currency_to,
        formatCurrency(amount),
      ).catch(console.error);
      setShouldSendRequest(false);
    }
  }, [amount, conversationRequest, currencySelect, shouldSendRequest]);

  return (
    <>
      <Head>
        <title>Currency converter</title>
      </Head>
      {!isLoading && !converter_state?.loadingCurrencies ?
        <CurrencyConverter
          converter_state={converter_state}
          currencySelect={currencySelect}
          amount={amount}
          setAmount={setAmount}
          setShouldSendRequest={setShouldSendRequest}
          handleSwapCurrencies={handleSwapCurrencies}
          changeAndSaveBaseCurrency={changeAndSaveBaseCurrency}
        /> :
        <Loading />
      }
    </>
  );
};

export default Index;
