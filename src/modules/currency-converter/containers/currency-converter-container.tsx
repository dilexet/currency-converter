import React from 'react';
import {useAppDispatch, useAppSelector} from "../../shared/store/hooks/hooks";
import CurrencyConverter, {INITIAL_AMOUNT_VALUE} from "../components/currency-converter";
import {getCurrencies} from "../store/action-creator/currency-conversation-actions";
import Loading from "../../loading/components/loading";
import {BASE_CURRENCIES, BASE_CURRENCY_KEY} from "../../shared/constants/storage-currency.constants";
import {getLocation} from "../../location/services/get-currency-by-location";

export interface ICurrencySelect {
    currency_from: string,
    currency_to: string
}

const InitialCurrencySelectState: ICurrencySelect = {
    currency_from: "",
    currency_to: ""
}

const CurrencyConverterContainer = () => {
    const dispatch = useAppDispatch();
    const converter_state = useAppSelector(x => x.converter);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [currencySelect, setCurrencySelect] = React.useState<ICurrencySelect>(InitialCurrencySelectState);
    const [amount, setAmount] = React.useState(INITIAL_AMOUNT_VALUE.toString());

    const handleAmountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newAmount = e.target.value.replace(/,/g, '.');
        setAmount(newAmount);
        sendRequest(formatCurrency(newAmount));
    }

    const handleInputBlur = () => {
        const formattedCurrency = formatCurrency(amount);
        setAmount(formattedCurrency.toString())
        sendRequest(formattedCurrency);
    }

    const formatCurrency = (currencyAmount: any) => {
        const validAmount = parseFloat(parseFloat(currencyAmount).toFixed(2));
        if (validAmount && !isNaN(validAmount)) {
            return validAmount;
        } else {
            return INITIAL_AMOUNT_VALUE;
        }
    }

    const sendRequest = (currencyAmount: number) => {
        console.log(currencyAmount);
    }

    const changeCurrencySelectFrom = (currencySelectFrom: string) => {
        if (currencySelectFrom === currencySelect.currency_to) {
            setCurrencySelect(currencySelect =>
                ({
                    currency_from: currencySelectFrom,
                    currency_to: currencySelect.currency_from
                }));
        } else {
            setCurrencySelect(currencySelect =>
                ({...currencySelect, currency_from: currencySelectFrom}))
        }
    }

    const changeCurrencySelectTo = (currencySelectTo: string) => {
        if (currencySelectTo === currencySelect.currency_from) {
            setCurrencySelect(currencySelect =>
                ({
                    currency_from: currencySelect.currency_to,
                    currency_to: currencySelectTo
                }));
        } else {
            setCurrencySelect(currencySelect =>
                ({
                    ...currencySelect,
                    currency_to: currencySelectTo
                }))
        }
    }

    const handleSwapCurrencies = () => {
        setCurrencySelect(currencySelect =>
            ({
                currency_from: currencySelect.currency_to,
                currency_to: currencySelect.currency_from
            }))
    }

    const fetchData = React.useCallback(async () => {
        await dispatch(await getCurrencies());
    }, [dispatch]);

    const loadBaseCurrencySelect = React.useCallback(async () => {
        if (currencySelect === InitialCurrencySelectState) {
            const sessionBaseCurrency = sessionStorage.getItem(BASE_CURRENCY_KEY);
            if (sessionBaseCurrency) {
                setCurrencySelect({
                    currency_from: sessionBaseCurrency,
                    currency_to: sessionBaseCurrency === BASE_CURRENCIES.USD ?
                        BASE_CURRENCIES.EUR :
                        BASE_CURRENCIES.USD
                });
            } else {
                const baseCurrencyByLocation = await getLocation();
                setCurrencySelect({
                    currency_from: baseCurrencyByLocation,
                    currency_to: baseCurrencyByLocation === BASE_CURRENCIES.USD ?
                        BASE_CURRENCIES.EUR :
                        BASE_CURRENCIES.USD
                });
            }
        }
    }, [currencySelect])

    React.useEffect(() => {
        if (isLoading) {
            loadBaseCurrencySelect().catch(console.error);
            fetchData().catch(console.error);
            setIsLoading(false)
        }
    }, [isLoading, fetchData, loadBaseCurrencySelect])

    if (!isLoading && converter_state?.loadingCurrencies === false) {
        return (
            <CurrencyConverter
                converter_state={converter_state}
                currencySelect={currencySelect}
                amount={amount}
                changeCurrencySelectFrom={changeCurrencySelectFrom}
                changeCurrencySelectTo={changeCurrencySelectTo}
                handleAmountChange={handleAmountChange}
                handleInputBlur={handleInputBlur}
                handleSwapCurrencies={handleSwapCurrencies}
            />
        )
    } else {
        return (
            <Loading/>
        )
    }
}

export default CurrencyConverterContainer;