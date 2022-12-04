import React from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {ICurrencyInputComponentProps} from "../types/currency-input-props";

const CurrencyInput: React.FC<ICurrencyInputComponentProps> = ({
                                                                  amount, handleAmountChange, handleInputBlur,
                                                                  currencySelect, loadingConversation
                                                              }) => {
    return (
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
                                loadingConversation ?
                                    <CircularProgress size={25}/> :
                                    <></>
                            }
                        </InputAdornment>
                    }
                label="Amount"
            />
        </FormControl>
    )
}

export default CurrencyInput;