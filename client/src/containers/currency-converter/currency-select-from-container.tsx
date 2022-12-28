import React from "react";
import { ICurrencySelectContainersProps } from "../../types/currency-converter/currency-select-props";
import { useAppSelector } from "../../hooks/hooks";
import { ICurrencySelect } from "../../types/currency-converter/currency-converter-select";
import CurrencySelectFrom from "../../components/currency-converter/currency-select-from";
import { selectAll } from "../../redux/reducers/currency-converter-reducer";

const CurrencySelectFromContainer = ({
                                       currencySelect,
                                       changeAndSaveBaseCurrency,
                                     }: ICurrencySelectContainersProps) => {
  const currencies = useAppSelector(selectAll);
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
      currencies={currencies}
      changeCurrencySelect={changeCurrencySelectFrom}
    />
  );
};

export default CurrencySelectFromContainer;
