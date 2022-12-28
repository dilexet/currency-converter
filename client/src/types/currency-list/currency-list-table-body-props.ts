import React from "react";
import { ICurrenciesObject } from "../currency-converter/currency-object";

export interface ICurrencyListTableBodyComponentProps {
  currencies: ICurrenciesObject[];
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>;
  handleRemoveFromFavorite: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    favoriteCurrencyCode: string,
  ) => Promise<void>;
  handleAddToFavorite: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    favoriteCurrencyCode: string,
  ) => Promise<void>;
}

export interface ICurrencyListTableBodyContainerProps {
  currencies: ICurrenciesObject[];
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>;
}
