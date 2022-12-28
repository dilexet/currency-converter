import React from "react";
import { ICurrencySelect } from "./currency-converter-select";

export interface ICurrencyConverterComponentProps {
  currencySelect: ICurrencySelect;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setShouldSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwapCurrencies: () => void;
  changeAndSaveBaseCurrency: (newBaseCurrency: ICurrencySelect) => void;
}
