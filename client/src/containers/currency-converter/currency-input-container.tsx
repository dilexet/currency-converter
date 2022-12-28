import React from "react";
import { ICurrencyInputContainerProps } from "../../types/currency-converter/currency-input-props";
import { useAppSelector } from "../../hooks/hooks";
import { formatCurrency } from "../../utils/format-currency";
import CurrencyInput from "../../components/currency-converter/currency-input";

const CurrencyInputContainer = ({
                                  amount,
                                  setAmount,
                                  setShouldSendRequest,
                                  currencySelect,
                                }: ICurrencyInputContainerProps) => {
  const converter_state = useAppSelector((x) => x.converter);

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const newAmount = e.target.value.replace(/,/g, ".");
    setAmount(newAmount);
    setShouldSendRequest(true);
  };

  const handleInputBlur = (): void => {
    const formattedCurrency = formatCurrency(amount);
    setAmount(formattedCurrency.toString());
    if (formattedCurrency.toString() !== amount.toString()) {
      setShouldSendRequest(true);
    }
  };

  return (
    <CurrencyInput
      amount={amount}
      handleAmountChange={handleAmountChange}
      handleInputBlur={handleInputBlur}
      currencySelect={currencySelect}
      loadingConversation={converter_state?.loadingConversationStatus === "loading"}
    />
  );
};

export default CurrencyInputContainer;
