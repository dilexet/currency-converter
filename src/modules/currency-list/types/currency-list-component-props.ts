import React from "react";

export interface CurrenciesObject {
    code: string,
    name: string,
    rate: number,
    isFavorite: boolean
}

export interface CurrencyListComponentProps {
    currencies: CurrenciesObject[],
    baseCurrency: string,
    changeBaseCurrency: (newBaseCurrency: string) => void;
    handleAddToFavorite: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => void;
    handleRemoveFromFavorite: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => void;
}