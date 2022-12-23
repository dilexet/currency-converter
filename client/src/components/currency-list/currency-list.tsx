import React from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableContainer,
  Skeleton,
} from "@mui/material";
import CurrencyListTableBodyContainer from "../../containers/currency-list/currency-list-table-body-container";
import CurrencyListTableHead from "./currency-list-table-head";
import { ICurrencyListComponentProps } from "../../types/currency-list/currency-list-component-props";

const CurrencyList = ({
  currencies,
  isLoadingState,
  baseCurrency,
  changeBaseCurrency,
}: ICurrencyListComponentProps) => {
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='lg'>
      <Grid item>
        <Box
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoadingState ? (
            <Skeleton variant='rounded' width={"60%"} height={56} />
          ) : (
            <FormControl sx={{ width: "60%" }}>
              <InputLabel id='base-currency-select-label'>
                Base currency
              </InputLabel>
              <Select
                labelId='base-currency-select-label'
                value={baseCurrency}
                label='Base currency'
                onChange={async (event) => {
                  await changeBaseCurrency(event.target.value);
                }}
              >
                {currencies?.map((currency, index) => (
                  <MenuItem value={currency.code} key={index}>
                    {`${currency.code} : ${currency.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box>
          <TableContainer component={Paper}>
            {isLoadingState ? (
              <Skeleton variant='rounded' width={"100%"} height={"100vh"} />
            ) : (
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <CurrencyListTableHead />
                <CurrencyListTableBodyContainer
                  currencies={currencies}
                  changeBaseCurrency={changeBaseCurrency}
                />
              </Table>
            )}
          </TableContainer>
        </Box>
      </Grid>
    </Container>
  );
};

export default CurrencyList;
