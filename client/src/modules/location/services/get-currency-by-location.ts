import axios from 'axios'
import {
  CURRENCY_BY_LOCATION_REQUEST,
  API_KEY,
} from '../../shared/constants/location-api.constants'
import {
  BASE_CURRENCIES,
  BASE_CURRENCY_KEY,
} from '../../shared/constants/storage-currency.constants'

export const getLocation = async (): Promise<string> => {
  const response = await axios.get(CURRENCY_BY_LOCATION_REQUEST, { params: { 'api-key': API_KEY } })
  const thereIsCode = Boolean(response?.data?.code)
  if (thereIsCode) {
    localStorage.setItem(BASE_CURRENCY_KEY, response?.data?.code)
    return response?.data?.code
  } else {
    localStorage.setItem(BASE_CURRENCY_KEY, BASE_CURRENCIES.USD)
    return BASE_CURRENCIES.USD
  }
}
