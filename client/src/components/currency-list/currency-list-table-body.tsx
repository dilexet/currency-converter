import React from "react";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ICurrencyListTableBodyComponentProps } from "../../types/currency-list/currency-list-table-body-props";
import styles from "../../styles/CurrencyList.module.css";

const CurrencyListTableBody = ({
  currencies,
  changeBaseCurrency,
  handleRemoveFromFavorite,
  handleAddToFavorite,
}: ICurrencyListTableBodyComponentProps) => {
  return (
    <TableBody>
      {currencies?.map((currency, index) => (
        <TableRow
          key={index}
          className={styles.table_currency_row}
          onClick={async () => {
            await changeBaseCurrency(currency?.code);
          }}
        >
          <TableCell align='left'>
            <Typography variant='body1'>{currency?.code}</Typography>
          </TableCell>
          <TableCell align='center'>
            <Typography variant='body1'>{currency?.name}</Typography>
          </TableCell>
          <TableCell align='left'>
            <Typography variant='body1'>{currency?.rate}</Typography>
          </TableCell>
          <TableCell align='center'>
            {currency.isFavorite ? (
              <FavoriteIcon
                color='error'
                cursor='pointer'
                onClick={async (e) => {
                  await handleRemoveFromFavorite(e, currency?.code);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                cursor='pointer'
                onClick={async (e) => {
                  await handleAddToFavorite(e, currency?.code);
                }}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CurrencyListTableBody;
