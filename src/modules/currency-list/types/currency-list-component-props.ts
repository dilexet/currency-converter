import React from "react";

export interface ICurrenciesObject {
    code: string,
    name: string,
    rate: number,
    isFavorite: boolean
}

export interface ICurrencyListComponentProps {
    currencies: ICurrenciesObject[],
    baseCurrency: string,
    changeBaseCurrency: (newBaseCurrency: string) => void;
    handleAddToFavorite: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => void;
    handleRemoveFromFavorite: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, favoriteCurrencyCode: string) => void;
}