import React from 'react'
import CurrencyConverterContainer from '../../currency-converter/containers/currency-converter-container'
import NotFoundContainer from '../../not-found-page/containers/not-found-container'
import CurrencyListContainer from '../../currency-list/containers/currency-list-container'
import Routes from '../types/routes'

const RoutesArray: Routes[] = [
  {
    path: '/',
    element: <CurrencyConverterContainer />,
  },
  {
    path: '/currencies',
    element: <CurrencyListContainer />,
  },
  {
    path: '*',
    element: <NotFoundContainer />,
  },
]

export default RoutesArray
