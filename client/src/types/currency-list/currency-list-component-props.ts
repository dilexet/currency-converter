import { Dictionary } from "@reduxjs/toolkit";

export interface ICurrenciesObject {
  code: string;
  name: string;
  rate: number;
  isFavorite: boolean;
}

export interface ICurrencyListComponentProps {
  currencies: Dictionary<ICurrenciesObject>;
  baseCurrency: string;
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>;
  isLoadingState: boolean;
}
