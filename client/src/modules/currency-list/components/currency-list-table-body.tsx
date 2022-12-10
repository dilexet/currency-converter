import React from 'react';
import {TableBody, TableCell, TableRow, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {ICurrencyListTableBodyComponentProps} from "../types/currency-list-table-body-props";

const CurrencyListTableBody: React.FC<ICurrencyListTableBodyComponentProps> = ({
                                                                                   currencies,
                                                                                   changeBaseCurrency,
                                                                                   handleRemoveFromFavorite,
                                                                                   handleAddToFavorite
                                                                               }) => {
    return (
        <TableBody>
            {currencies?.map((currency, index) => (
                <TableRow key={index} className="table-currency-row"
                          onClick={() => changeBaseCurrency(currency?.code)}>
                    <TableCell align="left">
                        <Typography variant="body1">
                            {currency?.code}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="body1">
                            {currency?.name}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="body1">
                            {currency?.rate}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        {
                            currency.isFavorite ?
                                <FavoriteIcon color="error" cursor="pointer"
                                              onClick={(e) =>
                                                  handleRemoveFromFavorite(e, currency?.code)}/> :
                                <FavoriteBorderIcon cursor="pointer" onClick={(e) =>
                                    handleAddToFavorite(e, currency?.code)}/>
                        }
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default CurrencyListTableBody;