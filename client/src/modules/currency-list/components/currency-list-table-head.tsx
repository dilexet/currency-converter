import React from 'react'
import { TableCell, TableHead, TableRow, Typography } from '@mui/material'

const CurrencyListTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>
          <Typography variant='h6'>Code</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography variant='h6'>Name</Typography>
        </TableCell>
        <TableCell align='left'>
          <Typography variant='h6'>Rate</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography variant='h6'>Add to favorite</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default CurrencyListTableHead
