import React from "react";
import { ICurrenciesObject } from "./currency-list-component-props";
import { Dictionary } from "@reduxjs/toolkit";

export interface ICurrencyListTableBodyComponentProps {
  currencies: Dictionary<ICurrenciesObject>;
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
  currencies: Dictionary<ICurrenciesObject>;
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>;
}
