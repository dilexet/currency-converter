export interface ICurrenciesObject {
  code: string
  name: string
  rate: number
  isFavorite: boolean
}

export interface ICurrencyListComponentProps {
  currencies: ICurrenciesObject[]
  baseCurrency: string
  changeBaseCurrency: (newBaseCurrency: string) => Promise<void>
}
