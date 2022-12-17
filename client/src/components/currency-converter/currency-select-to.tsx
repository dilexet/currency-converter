import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ICurrencySelectComponentsProps } from "../../types/currency-converter/currency-select-props";
import styles from "../../styles/CurrencyInput.module.css";

const CurrencySelectTo = ({
  currencySelect,
  changeCurrencySelect,
  currencies,
}: ICurrencySelectComponentsProps) => {
  return (
    <FormControl className={styles.form_control}>
      <InputLabel id="select-currency-to" className={styles.custom_input_label}>
        To
      </InputLabel>
      <Select
        labelId="select-currency-to"
        value={currencySelect.currency_to}
        label="To"
        className={styles.currency_select}
        onChange={(event) => changeCurrencySelect(event.target?.value)}
      >
        {currencies?.map((currency, index) => (
          <MenuItem value={currency.code} key={index}>
            {`${currency.code} - ${currency.name}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelectTo;
