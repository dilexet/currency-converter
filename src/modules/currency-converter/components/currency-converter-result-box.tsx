import React from 'react';
import {Box, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {ICurrencyConverterResultComponentProps} from "../types/currency-converter-result-component-props";

const CurrencyConverterResultBox: React.FC<ICurrencyConverterResultComponentProps> = ({
                                                                                         converter_state,
                                                                                         currencySelect,
                                                                                         amount
                                                                                     }) => {
    return (
        <Box className="currency-converter-main-box">
            {
                converter_state?.loadingConversation === true ?
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box> :
                    <Box className='currency-converter-box'>
                        <Box className='currency-converter-result-box'>
                            {
                                converter_state?.amount !== 0 && amount ?
                                    <Box>
                                        <Typography className="currency-converter-from-text" variant="body1">
                                            {
                                                `${converter_state?.amount} ${currencySelect.currency_from} = `
                                            }
                                        </Typography>
                                        <Typography className="currency-converter-to-whole-part-text"
                                                    variant="body1">
                                            {
                                                `${converter_state?.conversationResult?.wholePart}`
                                            }
                                            <span className="currency-converter-to-remainder-text">
                                                     {
                                                         `${converter_state?.conversationResult?.remainder}`
                                                     }
                                                </span>
                                            {
                                                ` ${currencySelect.currency_to}`
                                            }
                                        </Typography>
                                    </Box>
                                    : <></>
                            }
                        </Box>
                        <Box className='currency-converter-rates-box'>
                            <Typography className="currency-converter-rates-text">
                                {
                                    converter_state?.amount !== 0 && amount ?
                                        `1 ${currencySelect.currency_from} = ${converter_state?.conversationRates} ${currencySelect.currency_to}`
                                        : ""
                                }
                            </Typography>
                        </Box>
                    </Box>
            }
        </Box>
    )
}

export default CurrencyConverterResultBox;