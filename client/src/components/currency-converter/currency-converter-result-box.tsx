import React from "react";
import { Box, Skeleton, Typography, Grid } from "@mui/material";
import { ICurrencyConverterResultComponentProps } from "../../types/currency-converter/currency-converter-result-component-props";
import styles from "../../styles/CurrencyConverterResultBox.module.css";

const CurrencyConverterResultBox = ({
  converter_state,
  currencySelect,
  amount,
}: ICurrencyConverterResultComponentProps) => {
  return (
    <Box className={styles.currency_converter_main_box}>
      {converter_state?.loadingConversation ? (
        <Box sx={{ display: "flex" }}>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <Skeleton variant='rounded' width={"100%"} height={43} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='rounded' width={"100%"} height={82} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='rounded' width={"100%"} height={28} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={styles.currency_converter_box}>
          <Box className={styles.currency_converter_result_box}>
            {converter_state?.amount !== 0 && amount !== "" ? (
              <Box>
                <Typography
                  className={styles.currency_converter_from_text}
                  variant='body1'
                >
                  {`${converter_state?.amount} ${currencySelect.currency_from} = `}
                </Typography>
                <Typography
                  className={styles.currency_converter_to_whole_part_text}
                  variant='body1'
                >
                  {`${converter_state?.conversationResult?.wholePart}`}
                  <span className={styles.currency_converter_to_remainder_text}>
                    {`${converter_state?.conversationResult?.remainder}`}
                  </span>
                  {` ${currencySelect.currency_to}`}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box className={styles.currency_converter_rates_text}>
            <Typography className={styles.currency_converter_rates_text}>
              {converter_state?.amount !== 0 && amount !== ""
                ? `1 ${currencySelect.currency_from} = ${converter_state?.conversationRates} ${currencySelect.currency_to}`
                : ""}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CurrencyConverterResultBox;
