import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ICurrencySelectContainersProps } from "../../types/currency-converter/currency-select-props";
import { ICurrencySelect } from "../../types/currency-converter/currency-converter-select";
import CurrencySelectTo from "../../components/currency-converter/currency-select-to";

const CurrencySelectToContainer = ({
  currencySelect,
  changeAndSaveBaseCurrency,
}: ICurrencySelectContainersProps) => {
  const converter_state = useAppSelector((x) => x.converter);

  const changeCurrencySelectTo = (currencySelectTo: string): void => {
    let newBaseCurrency: ICurrencySelect;
    if (currencySelectTo === currencySelect.currency_from) {
      newBaseCurrency = {
        currency_from: currencySelect.currency_to,
        currency_to: currencySelectTo,
      };
    } else {
      newBaseCurrency = {
        ...currencySelect,
        currency_to: currencySelectTo,
      };
    }
    changeAndSaveBaseCurrency(newBaseCurrency);
  };

  return (
    <CurrencySelectTo
      currencySelect={currencySelect}
      currencies={converter_state?.currencies}
      changeCurrencySelect={changeCurrencySelectTo}
    />
  );
};

export default CurrencySelectToContainer;
