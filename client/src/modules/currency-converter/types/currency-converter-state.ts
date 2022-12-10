import {ICurrenciesObject} from "./currency-converter-component-props";

interface ICurrencyConverterState {
    loadingCurrencies: boolean,
    loadingConversation: boolean,
    success: boolean,
    conversationResult: {
        wholePart: number;
        remainder: string
    },
    conversationRates: number,
    amount: number,
    currencies: ICurrenciesObject[],
}

export default ICurrencyConverterState;