import { ICurrenciesObject } from '../types/currency-list/currency-list-component-props'

const currencySortComparator = (
  a: ICurrenciesObject,
  b: ICurrenciesObject
): number => {
  return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1;
};

export default currencySortComparator;
