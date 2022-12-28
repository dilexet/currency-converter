import React from "react";
import { ICurrencyListTableBodyContainerProps } from "../../types/currency-list/currency-list-table-body-props";
import { useAppDispatch } from "../../hooks/hooks";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../actions/currency-list-actions";
import CurrencyListTableBody from "../../components/currency-list/currency-list-table-body";

const CurrencyListTableBodyContainer = ({
                                          currencies,
                                          changeBaseCurrency,
                                        }: ICurrencyListTableBodyContainerProps) => {
  const dispatch = useAppDispatch();

  const handleAddToFavorite = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    favoriteCurrencyCode: string,
  ): Promise<void> => {
    e.stopPropagation();
    await dispatch(await addToFavorite(favoriteCurrencyCode));
  };
  const handleRemoveFromFavorite = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    favoriteCurrencyCode: string,
  ): Promise<void> => {
    e.stopPropagation();
    await dispatch(await removeFromFavorite(favoriteCurrencyCode));
  };
  return (
    <CurrencyListTableBody
      currencies={currencies}
      changeBaseCurrency={changeBaseCurrency}
      handleAddToFavorite={handleAddToFavorite}
      handleRemoveFromFavorite={handleRemoveFromFavorite}
    />
  );
};

export default CurrencyListTableBodyContainer;
