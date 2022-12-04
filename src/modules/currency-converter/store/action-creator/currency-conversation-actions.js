import axios from "axios";
import {SUPPORTED_CODES_REQUEST, PAIR_CONVERSATION_REQUEST} from "../../../shared/constants/currencies-api.constants";
import {
    loadingCurrencies, get_currencies_success, get_currencies_error,
    loadingConversation, get_conversation_result_success, get_conversation_result_error
} from "../reducers/currency-converter-reducer";

export const getCurrencies = () => {
    return async (dispatch) => {
        dispatch(loadingCurrencies())
        axios.get(SUPPORTED_CODES_REQUEST)
            .then((response) => {
                const currencies_array = response?.data?.supported_codes?.map(([key, value]) => ({
                    code: key,
                    name: value,
                }));
                dispatch(get_currencies_success({
                    currencies: currencies_array
                }))
            })
            .catch(() => dispatch(get_currencies_error()));
    }
}

export const currencyConversation = (currencyFrom, currencyTo, amount) => {
    return async (dispatch) => {
        dispatch(loadingConversation())
        axios.get(PAIR_CONVERSATION_REQUEST + `${currencyFrom}/${currencyTo}/${amount}`)
            .then((response) => {
                const wholePart = Math.trunc(response?.data?.conversion_result * 100) / 100;
                const remainder = response?.data?.conversion_result.toString().replace(wholePart.toString(), "");
                dispatch(get_conversation_result_success({
                    conversationResult: {
                        wholePart: wholePart,
                        remainder: remainder
                    },
                    conversationRates: response?.data?.conversion_rate,
                    amount: amount
                }))
            })
            .catch(() => dispatch(get_conversation_result_error()));
    }
}