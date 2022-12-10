import {ICurrenciesObject} from "./currency-list-component-props";

export interface ICurrencyListState {
    loading: boolean,
    success: boolean,
    currencies: ICurrenciesObject[],
}