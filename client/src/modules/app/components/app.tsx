import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import FooterContainer from '../../footer/containers/footer-container'
import HeaderContainer from '../../header/containers/header-container'
import AppRoutes from './app-routes'

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline>
        <HeaderContainer />
        <AppRoutes />
        <FooterContainer />
      </CssBaseline>
    </Box>
  )
}

export default App
