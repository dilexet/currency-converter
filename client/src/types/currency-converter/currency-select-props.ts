import { ICurrencySelect } from "./currency-converter-select";
import { ICurrencies } from "./currency-object";

export interface ICurrencySelectComponentsProps {
  currencySelect: ICurrencySelect;
  changeCurrencySelect: (currencySelect: string) => void;
  currencies: ICurrencies[];
}

export interface ICurrencySelectContainersProps {
  currencySelect: ICurrencySelect;
  changeAndSaveBaseCurrency: (newBaseCurrency: ICurrencySelect) => void;
}
