import {ICurrenciesObject} from "../types/currency-list-component-props";

function currencySortComparator(a: ICurrenciesObject, b: ICurrenciesObject) {
    return (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1;
}

export default currencySortComparator;