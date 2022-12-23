import React from "react";
import ICurrencyConverterState from "./currency-converter-state";
import { ICurrencySelect } from "./currency-converter-select";

export interface ICurrenciesObject {
  code: string;
  name: string;
}

export interface ICurrencyConverterComponentProps {
  converter_state: ICurrencyConverterState;
  currencySelect: ICurrencySelect;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setShouldSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwapCurrencies: () => void;
  changeAndSaveBaseCurrency: (newBaseCurrency: ICurrencySelect) => void;
}
