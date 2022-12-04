import React from 'react';
import {useAppSelector} from "../../shared/store/hooks/hooks";
import CurrencyInput from "../components/currency-input";
import {formatCurrency} from "../utils/format-currency";
import {ICurrencyInputContainerProps} from "../types/currency-input-props";

const CurrencyInputContainer: React.FC<ICurrencyInputContainerProps> = ({
                                                                           amount,
                                                                           setAmount,
                                                                           setShouldSendRequest,
                                                                           currencySelect
                                                                       }) => {
    const converter_state = useAppSelector(x => x.converter);

    const handleAmountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newAmount = e.target.value.replace(/,/g, '.');
        setAmount(newAmount);
        setShouldSendRequest(true);
    }

    const handleInputBlur = () => {
        const formattedCurrency = formatCurrency(amount);
        setAmount(formattedCurrency.toString())
        setShouldSendRequest(true);
    }

    return (
        <CurrencyInput
            amount={amount}
            handleAmountChange={handleAmountChange}
            handleInputBlur={handleInputBlur}
            currencySelect={currencySelect}
            loadingConversation={converter_state?.loadingConversation}
        />
    )
}

export default CurrencyInputContainer;