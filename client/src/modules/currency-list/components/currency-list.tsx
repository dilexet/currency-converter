import React from 'react'
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableContainer,
} from '@mui/material'
import { ICurrencyListComponentProps } from '../types/currency-list-component-props'
import CurrencyListTableBodyContainer from '../containers/currency-list-table-body-container'
import '../css/table.css'
import CurrencyListTableHead from './currency-list-table-head'

const CurrencyList: React.FC<ICurrencyListComponentProps> = ({
  currencies,
  baseCurrency,
  changeBaseCurrency,
}) => {
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='lg'>
      <Grid item>
        <Box
          style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormControl sx={{ width: '60%' }}>
            <InputLabel id='base-currency-select-label'>Base currency</InputLabel>
            <Select
              labelId='base-currency-select-label'
              value={baseCurrency}
              label='Base currency'
              onChange={(event) => {
                void (async () => {
                  await changeBaseCurrency(event.target.value)
                })
              }}
            >
              {currencies?.map((currency, index) => (
                <MenuItem value={currency.code} key={index}>
                  {`${currency.code} : ${currency.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <CurrencyListTableHead />
              <CurrencyListTableBodyContainer
                currencies={currencies}
                changeBaseCurrency={changeBaseCurrency}
              />
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Container>
  )
}

export default CurrencyList
