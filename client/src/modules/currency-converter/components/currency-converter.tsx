import React from 'react'
import { Box, Container, Grid, IconButton } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { ICurrencyConverterComponentProps } from '../types/currency-converter-component-props'
import CurrencyInputContainer from '../containers/currency-input-container'
import CurrencySelectFromContainer from '../containers/currency-select-from-container'
import CurrencySelectToContainer from '../containers/currency-select-to-container'
import '../css/style.css'
import CurrencyConverterResultBox from './currency-converter-result-box'

const CurrencyConverter: React.FC<ICurrencyConverterComponentProps> = ({
  converter_state,
  currencySelect,
  amount,
  setAmount,
  setShouldSendRequest,
  handleSwapCurrencies,
  changeAndSaveBaseCurrency,
}) => {
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='lg'>
      <Grid
        container
        className='main-box'
        columns={{ xs: 1, sm: 1, md: 4 }}
        spacing={4}
        direction='row'
        justifyContent='left'
        alignItems='left'
      >
        <Grid item>
          <CurrencyInputContainer
            amount={amount}
            currencySelect={currencySelect}
            setAmount={setAmount}
            setShouldSendRequest={setShouldSendRequest}
          />
        </Grid>
        <Grid item>
          <CurrencySelectFromContainer
            currencySelect={currencySelect}
            changeAndSaveBaseCurrency={changeAndSaveBaseCurrency}
          />
        </Grid>
        <Grid item>
          <Box className='swapper-icon-box'>
            <IconButton className='swap-currencies-button' onClick={handleSwapCurrencies}>
              <SwapHorizIcon fontSize='large' color='primary' />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <CurrencySelectToContainer
            currencySelect={currencySelect}
            changeAndSaveBaseCurrency={changeAndSaveBaseCurrency}
          />
        </Grid>
      </Grid>
      <CurrencyConverterResultBox
        amount={amount}
        currencySelect={currencySelect}
        converter_state={converter_state}
      />
    </Container>
  )
}

export default CurrencyConverter
