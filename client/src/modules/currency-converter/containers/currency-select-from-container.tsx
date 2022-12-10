import React from 'react';
import {useAppSelector} from "../../shared/store/hooks/hooks";
import CurrencySelectFrom from "../components/currency-select-from";
import {ICurrencySelect} from "../types/currency-converter-select";
import {ICurrencySelectContainersProps} from "../types/currency-select-props";

const CurrencySelectFromContainer: React.FC<ICurrencySelectContainersProps> = ({
                                                                                  currencySelect,
                                                                                  changeAndSaveBaseCurrency
                                                                              }) => {
    const converter_state = useAppSelector(x => x.converter);

    const changeCurrencySelectFrom = (currencySelectFrom: string) => {
        let newBaseCurrency: ICurrencySelect;
        if (currencySelectFrom === currencySelect.currency_to) {
            newBaseCurrency = {
                currency_from: currencySelectFrom,
                currency_to: currencySelect.currency_from
            };
        } else {
            newBaseCurrency = {
                ...currencySelect,
                currency_from: currencySelectFrom
            };
        }
        changeAndSaveBaseCurrency(newBaseCurrency);
    }
    return (
        <CurrencySelectFrom
            currencySelect={currencySelect}
            currencies={converter_state?.currencies}
            changeCurrencySelect={changeCurrencySelectFrom}/>
    )
}

export default CurrencySelectFromContainer;