import {ICurrenciesObject} from "./currency-converter-component-props";

interface ICurrencyConverterState {
    loadingCurrencies: boolean,
    loadingConversation: boolean,
    success: boolean,
    conversationResult: number,
    conversationRates: number,
    currencies: ICurrenciesObject[],
}

export default ICurrencyConverterState;