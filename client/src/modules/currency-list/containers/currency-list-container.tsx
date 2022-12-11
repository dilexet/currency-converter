import React from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks/hooks'
import Loading from '../../loading/components/loading'
import { getLocation } from '../../location/services/get-currency-by-location'
import { BASE_CURRENCY_KEY } from '../../shared/constants/storage-currency.constants'
import CurrencyList from '../components/currency-list'
import { getCurrencies } from '../store/action-creator/currency-list-actions'

const CurrencyListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const currencies_state = useAppSelector((x) => x.currency)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [baseCurrency, setBaseCurrency] = React.useState<string>('')

  const changeBaseCurrency = async (newBaseCurrency: string): Promise<void> => {
    await fetchData(newBaseCurrency)
    setBaseCurrency(newBaseCurrency)
    localStorage.setItem(BASE_CURRENCY_KEY, newBaseCurrency)
  }

  const fetchData = React.useCallback(
    async (newBaseCurrency: string) => {
      if (newBaseCurrency) {
        await dispatch(await getCurrencies(newBaseCurrency))
      } else {
        const savedBaseCurrency = localStorage.getItem(BASE_CURRENCY_KEY)
        if (savedBaseCurrency) {
          setBaseCurrency(savedBaseCurrency)
          await dispatch(await getCurrencies(savedBaseCurrency))
        } else {
          const baseCurrencyByLocation = await getLocation()
          setBaseCurrency(baseCurrencyByLocation)
          await dispatch(await getCurrencies(baseCurrencyByLocation))
        }
      }
    },
    [dispatch],
  )

  React.useEffect(() => {
    if (isLoading) {
      fetchData(baseCurrency).catch(console.error)
      setIsLoading(false)
    }
  }, [baseCurrency, fetchData, isLoading])

  if (!isLoading && !currencies_state?.loading) {
    return (
      <CurrencyList
        currencies={currencies_state.currencies}
        baseCurrency={baseCurrency}
        changeBaseCurrency={changeBaseCurrency}
      />
    )
  } else {
    return <Loading />
  }
}

export default CurrencyListContainer
