import React from "react";
import {ICurrencySelect} from "../containers/currency-converter-container";
import ICurrencyConverterState from "./currency-converter-state";

export interface ICurrenciesObject {
    code: string,
    name: string,
}

export interface ICurrencyConverterComponentProps {
    converter_state: ICurrencyConverterState,
    currencySelect: ICurrencySelect,
    amount: string,
    changeCurrencySelectFrom: (currencySelectFrom: string) => void;
    changeCurrencySelectTo: (currencySelectTo: string) => void;
    handleAmountChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleInputBlur: () => void;
    handleSwapCurrencies: () => void;
}