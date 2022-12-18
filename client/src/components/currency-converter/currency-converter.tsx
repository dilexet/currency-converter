import React from "react";
import { Box, Container, Grid, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ICurrencyConverterComponentProps } from "../../types/currency-converter/currency-converter-component-props";
import CurrencyInputContainer from "../../containers/currency-converter/currency-input-container";
import CurrencySelectFromContainer from "../../containers/currency-converter/currency-select-from-container";
import CurrencySelectToContainer from "../../containers/currency-converter/currency-select-to-container";
import styles from "../../styles/CurrencyConverter.module.css";
import CurrencyConverterResultBox from "./currency-converter-result-box";

const CurrencyConverter = ({
  converter_state,
  currencySelect,
  amount,
  setAmount,
  setShouldSendRequest,
  handleSwapCurrencies,
  changeAndSaveBaseCurrency,
}: ICurrencyConverterComponentProps) => {
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='lg'>
      <Grid
        container
        className={styles.main_box}
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
          <Box className={styles.swapper_icon_box}>
            <IconButton
              className={styles.swap_currencies_button}
              onClick={handleSwapCurrencies}
            >
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
  );
};

export default CurrencyConverter;
