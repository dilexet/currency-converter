import ICurrencyConverterState from './currency-converter-state'
import { ICurrencySelect } from './currency-converter-select'

export interface ICurrencyConverterResultComponentProps {
  converter_state: ICurrencyConverterState
  currencySelect: ICurrencySelect
  amount: string
}
