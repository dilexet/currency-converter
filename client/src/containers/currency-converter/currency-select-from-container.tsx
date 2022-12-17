import React from "react";
import { ICurrencySelectContainersProps } from "../../types/currency-converter/currency-select-props";
import { useAppSelector } from "../../hooks/hooks";
import { ICurrencySelect } from "../../types/currency-converter/currency-converter-select";
import CurrencySelectFrom from "../../components/currency-converter/currency-select-from";

const CurrencySelectFromContainer = ({
  currencySelect,
  changeAndSaveBaseCurrency,
}: ICurrencySelectContainersProps) => {
  const converter_state = useAppSelector((x) => x.converter);

  const changeCurrencySelectFrom = (currencySelectFrom: string): void => {
    let newBaseCurrency: ICurrencySelect;
    if (currencySelectFrom === currencySelect.currency_to) {
      newBaseCurrency = {
        currency_from: currencySelectFrom,
        currency_to: currencySelect.currency_from,
      };
    } else {
      newBaseCurrency = {
        ...currencySelect,
        currency_from: currencySelectFrom,
      };
    }
    changeAndSaveBaseCurrency(newBaseCurrency);
  };
  return (
    <CurrencySelectFrom
      currencySelect={currencySelect}
      currencies={converter_state?.currencies}
      changeCurrencySelect={changeCurrencySelectFrom}
    />
  );
};

export default CurrencySelectFromContainer;
