import React from 'react';
import {useAppDispatch, useAppSelector} from "../../shared/store/hooks/hooks";
import Loading from "../../loading/components/loading";
import {getLocation} from "../../location/services/get-currency-by-location";
import {BASE_CURRENCY_KEY} from "../../shared/constants/storage-currency.constants";
import CurrencyList from "../components/currency-list";
import {addToFavorite, removeFromFavorite, getCurrencies} from "../store/action-creator/currency-list-actions";

const CurrencyListContainer = () => {
    const dispatch = useAppDispatch();
    const currencies_state = useAppSelector(x => x.currency);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [baseCurrency, setBaseCurrency] = React.useState<string>("");

    const fetchData = React.useCallback(async (newBaseCurrency: string) => {
        if (newBaseCurrency) {
            await dispatch(await getCurrencies(newBaseCurrency));
        } else {
            const sessionBaseCurrency = sessionStorage.getItem(BASE_CURRENCY_KEY);
            if (sessionBaseCurrency) {
                setBaseCurrency(sessionBaseCurrency);
                await dispatch(await getCurrencies(sessionBaseCurrency));
            } else {
                const baseCurrencyByLocation = await getLocation();
                setBaseCurrency(baseCurrencyByLocation);
                await dispatch(await getCurrencies(baseCurrencyByLocation));
            }
        }
    }, [dispatch])

    const changeBaseCurrency = async (newBaseCurrency: string) => {
        await fetchData(newBaseCurrency);
        setBaseCurrency(newBaseCurrency);
        sessionStorage.setItem(BASE_CURRENCY_KEY, newBaseCurrency)
    };

    const handleAddToFavorite = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => {
        e.stopPropagation();
        await dispatch(await addToFavorite(favoriteCurrencyCode));
    }
    const handleRemoveFromFavorite = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => {
        e.stopPropagation();
        await dispatch(await removeFromFavorite(favoriteCurrencyCode));
    }

    React.useEffect(() => {
        if (isLoading) {
            fetchData(baseCurrency).catch(console.error)
            setIsLoading(false)
        }
    }, [dispatch, isLoading, baseCurrency, fetchData])

    if (!isLoading && currencies_state?.loading === false) {
        return (
            <CurrencyList currencies={currencies_state.currencies} baseCurrency={baseCurrency}
                          changeBaseCurrency={changeBaseCurrency}
                          handleAddToFavorite={handleAddToFavorite} handleRemoveFromFavorite={handleRemoveFromFavorite}
            />
        )
    } else {
        return (
            <Loading/>
        )
    }
}

export default CurrencyListContainer;