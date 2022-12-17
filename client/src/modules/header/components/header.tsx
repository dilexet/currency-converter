import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, Typography, Link as LinkMaterial, Button, Grid } from '@mui/material'
import { APP_NAME } from '../../shared/constants/base.constants'
import { IHeaderComponentProps } from '../types/header-component-props'
import { CURRENCY_CONVERTER, CURRENCY_LIST } from '../constants/base-routes.constants'

const Header: React.FC<IHeaderComponentProps> = ({ currentPath }) => {
  return (
    <Box>
      <AppBar position='static' color='default' elevation={0}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Box
            style={{
              width: '25%',
            }}
          >
            <Typography
              variant='h6'
              color='inherit'
              style={{ textDecoration: 'none', marginRight: '10px' }}
              component={Link}
              to='/'
            >
              {APP_NAME}
            </Typography>
          </Box>
          <Box
            style={{
              width: '75%',
            }}
          >
            <Grid
              container
              columnSpacing={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Grid item>
                <LinkMaterial
                  sx={{ my: 1, mx: 1.5 }}
                  variant='button'
                  component={Link}
                  to={
                    currentPath === CURRENCY_CONVERTER.path
                      ? CURRENCY_LIST.path
                      : CURRENCY_CONVERTER.path
                  }
                  style={{
                    textDecoration: 'none',
                    marginLeft: '20px',
                    opacity: '0.9',
                    fontSize: '1em',
                    fontWeight: '400',
                    textTransform: 'none',
                  }}
                >
                  {currentPath === CURRENCY_CONVERTER.path
                    ? CURRENCY_LIST.display
                    : CURRENCY_CONVERTER.display}
                </LinkMaterial>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
