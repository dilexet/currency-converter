import React from 'react'
import { ICurrencySelect } from './currency-converter-select'

export interface ICurrencyInputComponentProps {
  amount: string
  handleAmountChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleInputBlur: () => void
  currencySelect: ICurrencySelect
  loadingConversation: boolean
}

export interface ICurrencyInputContainerProps {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setShouldSendRequest: React.Dispatch<React.SetStateAction<boolean>>
  currencySelect: ICurrencySelect
}
