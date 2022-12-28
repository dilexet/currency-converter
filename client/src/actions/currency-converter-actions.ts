import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAIR_CONVERSATION_REQUEST, SUPPORTED_CODES_REQUEST } from "../constants/shared/currencies-api.constants";
import { ICurrencyConversationActionParams } from "../types/currency-converter/currency-converation-action-params";

export const getCurrenciesAsync = createAsyncThunk(
  "converter/fetchAll",
  async () => {
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
  },
);

export const currencyConversationAsync = createAsyncThunk(
  "converter/currencyConversation",
  async (params: ICurrencyConversationActionParams) => {
    const response = await axios
      .get(
        PAIR_CONVERSATION_REQUEST + `${params.currencyFrom}/${params.currencyTo}/${params.amount}`,
      );

    const wholePart =
      Math.trunc(response?.data?.conversion_result * 100) / 100;
    const remainder = response?.data?.conversion_result
      .toString()
      .replace(wholePart.toString(), "");
    const conversationRates = response?.data?.conversion_rate;

    return {
      wholePart: wholePart,
      remainder: remainder,
      conversationRates: conversationRates,
      amount: params.amount,
    };
  });