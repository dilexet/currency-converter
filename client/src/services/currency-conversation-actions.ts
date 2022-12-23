import axios from "axios";
import {
  get_conversation_result_error,
  get_conversation_result_success,
  loadingConversation,
} from "../redux/reducers/currency-converter-reducer";
import { PAIR_CONVERSATION_REQUEST, SUPPORTED_CODES_REQUEST } from "../constants/shared/currencies-api.constants";
import { AppDispatch } from "../redux/store";

export const getCurrencyAsync = async () => {
  try {
    const response = await axios.get(
      SUPPORTED_CODES_REQUEST,
      {
        headers:
          { "Accept-Encoding": "gzip,deflate,compress" },
      });
    return response?.data?.supported_codes?.map(
      ([key, value]: string) => ({
        code: key,
        name: value,
      }),
    );
  } catch (err) {
    console.log("ERROR");
    return [];
  }
};

export const currencyConversation = (
  currencyFrom: string, currencyTo: string, amount: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loadingConversation());
    axios
      .get(
        PAIR_CONVERSATION_REQUEST + `${currencyFrom}/${currencyTo}/${amount}`,
      )
      .then((response) => {
        const wholePart =
          Math.trunc(response?.data?.conversion_result * 100) / 100;
        const remainder = response?.data?.conversion_result
          .toString()
          .replace(wholePart.toString(), "");
        dispatch(
          get_conversation_result_success({
            conversationResult: {
              wholePart,
              remainder,
            },
            conversationRates: response?.data?.conversion_rate,
            amount,
          }),
        );
      })
      .catch(() => dispatch(get_conversation_result_error()));
  };
};
