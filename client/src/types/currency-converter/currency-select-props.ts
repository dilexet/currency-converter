import { ICurrencySelect } from "./currency-converter-select";
import { ICurrenciesObject } from "./currency-converter-component-props";

export interface ICurrencySelectComponentsProps {
  currencySelect: ICurrencySelect;
  changeCurrencySelect: (currencySelect: string) => void;
  currencies: ICurrenciesObject[];
}

export interface ICurrencySelectContainersProps {
  currencySelect: ICurrencySelect;
  changeAndSaveBaseCurrency: (newBaseCurrency: ICurrencySelect) => void;
}
