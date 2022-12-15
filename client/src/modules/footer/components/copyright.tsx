import React from 'react'
import { Typography, Link } from '@mui/material'
import { APP_NAME } from '../../shared/constants/base.constants'

const Copyright: React.FC = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        {APP_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright