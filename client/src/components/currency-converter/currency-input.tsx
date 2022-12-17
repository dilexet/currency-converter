import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ICurrencyInputComponentProps } from "../../types/currency-converter/currency-input-props";
import styles from "../../styles/CurrencyInput.module.css";

const CurrencyInput = ({
  amount,
  handleAmountChange,
  handleInputBlur,
  currencySelect,
  loadingConversation,
}: ICurrencyInputComponentProps) => {
  return (
    <FormControl className={styles.form_control}>
      <InputLabel htmlFor="amount-input" className={styles.custom_input_label}>
        Amount
      </InputLabel>
      <OutlinedInput
        id="amount-input"
        className={styles.amount_input}
        type="number"
        value={amount}
        onChange={handleAmountChange}
        onBlur={handleInputBlur}
        startAdornment={
          <InputAdornment position="start">
            {currencySelect?.currency_from}
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {loadingConversation ? <CircularProgress size={25} /> : <></>}
          </InputAdornment>
        }
        label="Amount"
      />
    </FormControl>
  );
};

export default CurrencyInput;
