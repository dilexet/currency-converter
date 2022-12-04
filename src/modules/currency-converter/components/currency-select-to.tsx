import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {ICurrencySelectComponentsProps} from "../types/currency-select-props";

const CurrencySelectTo: React.FC<ICurrencySelectComponentsProps> = ({
                                                                       currencySelect,
                                                                       changeCurrencySelect,
                                                                       currencies
                                                                   }) => {
    return (
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
                    changeCurrencySelect(event.target?.value)}
            >
                {
                    currencies?.map((currency, index) => (
                        <MenuItem value={currency.code} key={index}>
                            {`${currency.code} - ${currency.name}`}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default CurrencySelectTo;