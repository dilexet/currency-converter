import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ICurrencySelectComponentsProps } from '../types/currency-select-props'

const CurrencySelectFrom: React.FC<ICurrencySelectComponentsProps> = ({
  currencySelect,
  changeCurrencySelect,
  currencies,
}) => {
  return (
    <FormControl className='form-control'>
      <InputLabel id='select-currency-from' className='custom-input-label'>
        From
      </InputLabel>
      <Select
        labelId='select-currency-from'
        value={currencySelect.currency_from}
        label='From'
        className='currency-select'
        onChange={(event) => changeCurrencySelect(event.target?.value)}
      >
        {currencies?.map((currency, index) => (
          <MenuItem value={currency.code} key={index}>
            {`${currency.code} - ${currency.name}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CurrencySelectFrom
