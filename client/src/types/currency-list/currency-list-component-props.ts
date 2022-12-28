import { ICurrenciesObject } from "../currency-converter/currency-object";

export interface ICurrencyListComponentProps {
  currencies: ICurrenciesObject[];
  baseCurrency: string;
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>;
  isLoadingState: boolean;
}
