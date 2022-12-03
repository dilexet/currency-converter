import React from 'react';
import {
    Box,
    Container, FormControl,
    Grid, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ICurrencyListComponentProps} from "../types/currency-list-component-props";

import "../css/table.css";

const CurrencyList: React.FC<ICurrencyListComponentProps> = ({
                                                                currencies,
                                                                baseCurrency,
                                                                changeBaseCurrency,
                                                                handleAddToFavorite,
                                                                handleRemoveFromFavorite
                                                            }) => {
    return (
        <Container component="main" sx={{mt: 2, mb: 2}} maxWidth="lg">
            <Grid item>
                <Box style={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <FormControl sx={{width: "60%"}}>
                        <InputLabel id="base-currency-select-label">Base currency</InputLabel>
                        <Select
                            labelId="base-currency-select-label"
                            value={baseCurrency}
                            label="Base currency"
                            onChange={(e) => changeBaseCurrency(e.target.value)}
                        >
                            {currencies?.map((currency, index) => (
                                <MenuItem value={currency.code} key={index}>
                                    {`${currency.code} : ${currency.name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="h6">
                                            Code
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h6">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h6">
                                            Rate
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h6">
                                            Add to favorite
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
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
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
        </Container>
    )
}

export default CurrencyList;