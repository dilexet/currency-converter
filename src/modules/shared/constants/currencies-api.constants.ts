export const CURRENCIES_BASIC_API = "https://v6.exchangerate-api.com/v6/";

export const API_KEY = "ea7c0f9b11514db0e0e4beef";

export const SUPPORTED_CODES_REQUEST = CURRENCIES_BASIC_API + API_KEY + "/codes";

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT
export const PAIR_CONVERSATION_REQUEST = CURRENCIES_BASIC_API + API_KEY + "/pair/";

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
export const CONVERSATION_RATES_REQUEST = CURRENCIES_BASIC_API + API_KEY + "latest/";