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
      {Object.entries(currencies).map(([key, value]) => (
        <TableRow
          key={key}
          className={styles.table_currency_row}
          onClick={async () => {
            await changeBaseCurrency(value?.code ?? "");
          }}
        >
          <TableCell align="left">
            <Typography variant="body1">{value?.code}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="body1">{value?.name}</Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body1">{value?.rate}</Typography>
          </TableCell>
          <TableCell align="center">
            {value?.isFavorite ? (
              <FavoriteIcon
                color="error"
                cursor="pointer"
                onClick={async (e) => {
                  await handleRemoveFromFavorite(e, value?.code);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                cursor="pointer"
                onClick={async (e) => {
                  await handleAddToFavorite(e, value?.code ?? "");
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
