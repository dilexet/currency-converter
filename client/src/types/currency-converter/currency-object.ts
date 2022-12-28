export interface ICurrencies {
  code: string;
  name: string;
}

export interface ICurrenciesObject extends ICurrencies {
  rate: number;
  isFavorite: boolean;
}