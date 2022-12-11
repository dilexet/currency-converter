import { INITIAL_AMOUNT_VALUE } from '../constants/initial-states'

export const formatCurrency = (currencyAmount: string): number => {
  const validAmount = parseFloat(parseFloat(currencyAmount).toFixed(2))
  if (validAmount && !isNaN(validAmount)) {
    return validAmount
  } else {
    return INITIAL_AMOUNT_VALUE
  }
}
