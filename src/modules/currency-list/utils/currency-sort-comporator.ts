import {CurrenciesObject} from "../types/currency-list-component-props";

function currencySortComparator(a: CurrenciesObject, b: CurrenciesObject) {
    return (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1;
}

export default currencySortComparator;