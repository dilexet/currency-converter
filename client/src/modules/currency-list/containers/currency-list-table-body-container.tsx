import React from 'react';
import {useAppDispatch} from "../../shared/store/hooks/hooks";
import {
    ICurrencyListTableBodyContainerProps
} from "../types/currency-list-table-body-props";
import CurrencyListTableBody from "../components/currency-list-table-body";
import {addToFavorite, removeFromFavorite} from "../store/action-creator/currency-list-actions";

const CurrencyListTableBodyContainer: React.FC<ICurrencyListTableBodyContainerProps> = ({
                                                                                            currencies,
                                                                                            changeBaseCurrency,
                                                                                        }) => {
    const dispatch = useAppDispatch();

    const handleAddToFavorite = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => {
        e.stopPropagation();
        await dispatch(await addToFavorite(favoriteCurrencyCode));
    }
    const handleRemoveFromFavorite = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => {
        e.stopPropagation();
        await dispatch(await removeFromFavorite(favoriteCurrencyCode));
    }
    return (
        <CurrencyListTableBody
            currencies={currencies}
            changeBaseCurrency={changeBaseCurrency}
            handleAddToFavorite={handleAddToFavorite}
            handleRemoveFromFavorite={handleRemoveFromFavorite}
        />
    )
}

export default CurrencyListTableBodyContainer;