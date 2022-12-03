import React from 'react';
import {
    Box,
    Container,
    FormControl, Grid, IconButton,
    InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput, Select
} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CircularProgress from '@mui/material/CircularProgress';
import {ICurrencyConverterComponentProps} from "../types/currency-converter-component-props";
import "../css/style.css";

export const INITIAL_AMOUNT_VALUE = 1;

const CurrencyConverter: React.FC<ICurrencyConverterComponentProps> = ({
                                                                           converter_state,
                                                                           currencySelect,
                                                                           amount,
                                                                           changeCurrencySelectFrom,
                                                                           changeCurrencySelectTo,
                                                                           handleAmountChange,
                                                                           handleInputBlur,
                                                                           handleSwapCurrencies
                                                                       }) => {
    return (
        <Container component="main" sx={{mt: 2, mb: 2}} maxWidth="lg">
            <Grid container className="main-box"
                  columns={{xs: 1, sm: 1, md: 4}}
                  spacing={4}
                  direction="row"
                  justifyContent="center"
                  alignItems="left">
                <Grid item>
                    <FormControl className='form-control'>
                        <InputLabel htmlFor="amount-input" className="custom-input-label">
                            Amount
                        </InputLabel>
                        <OutlinedInput
                            id="amount-input"
                            className="amount-input"
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            onBlur={handleInputBlur}
                            startAdornment=
                                {
                                    <InputAdornment position="start">
                                        {currencySelect?.currency_from}
                                    </InputAdornment>
                                }
                            endAdornment=
                                {
                                    <InputAdornment position="end">
                                        {
                                            converter_state?.loadingConversation ?
                                                <CircularProgress size={25}/> :
                                                <></>
                                        }
                                    </InputAdornment>
                                }
                            label="Amount"
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className='form-control'>
                        <InputLabel id="select-currency-from" className="custom-input-label">
                            From
                        </InputLabel>
                        <Select
                            labelId="select-currency-from"
                            value={currencySelect.currency_from}
                            label="From"
                            className="currency-select"
                            onChange={(event) =>
                                changeCurrencySelectFrom(event.target?.value)}
                        >
                            {
                                converter_state?.currencies?.map((currency, index) => (
                                    <MenuItem value={currency.code} key={index}>
                                        {`${currency.code} - ${currency.name}`}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Box className="swapper-icon-box">
                        <IconButton className="swap-currencies-button" onClick={handleSwapCurrencies}>
                            <SwapHorizIcon fontSize="large" color="primary"/>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item>
                    <FormControl className='form-control'>
                        <InputLabel id="select-currency-to" className="custom-input-label">
                            To
                        </InputLabel>
                        <Select
                            labelId="select-currency-to"
                            value={currencySelect.currency_to}
                            label="To"
                            className="currency-select"
                            onChange={(event) =>
                                changeCurrencySelectTo(event.target?.value)}
                        >
                            {
                                converter_state?.currencies?.map((currency, index) => (
                                    <MenuItem value={currency.code} key={index}>
                                        {`${currency.code} - ${currency.name}`}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CurrencyConverter;