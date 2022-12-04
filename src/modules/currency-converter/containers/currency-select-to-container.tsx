import React from 'react';
import {useAppSelector} from "../../shared/store/hooks/hooks";
import {ICurrencySelect} from "../types/currency-converter-select";
import {ICurrencySelectContainersProps} from "../types/currency-select-props";
import CurrencySelectTo from "../components/currency-select-to";

const CurrencySelectToContainer: React.FC<ICurrencySelectContainersProps> = ({
                                                                                currencySelect,
                                                                                changeAndSaveBaseCurrency
                                                                            }) => {
    const converter_state = useAppSelector(x => x.converter);

    const changeCurrencySelectTo = (currencySelectTo: string) => {
        let newBaseCurrency: ICurrencySelect;
        if (currencySelectTo === currencySelect.currency_from) {
            newBaseCurrency = {
                currency_from: currencySelect.currency_to,
                currency_to: currencySelectTo
            };
        } else {
            newBaseCurrency = {
                ...currencySelect,
                currency_to: currencySelectTo
            };
        }
        changeAndSaveBaseCurrency(newBaseCurrency);
    }

    return (
        <CurrencySelectTo
            currencySelect={currencySelect}
            currencies={converter_state?.currencies}
            changeCurrencySelect={changeCurrencySelectTo}/>
    )
}

export default CurrencySelectToContainer;