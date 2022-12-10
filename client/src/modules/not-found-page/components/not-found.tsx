import React from 'react'
import { Box, Typography } from '@mui/material'
import '../css/style.css'

const NotFound: React.FC = () => {
  return (
    <Box
      style={{
        position: 'relative',
        height: '100vh',
      }}
    >
      <Box
        className='notfound'
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      >
        <Box className='notfound-404'>
          <Typography
            component='h3'
            style={{
              color: 'rgb(38, 38, 38)',
            }}
          >
            Oops! Page not found
          </Typography>
          <Typography
            component='h1'
            style={{
              color: 'rgb(38, 38, 38)',
            }}
          >
            <span
              style={{
                textShadow: '-8px 0 0 #27272A',
              }}
            >
              4
            </span>
            <span
              style={{
                textShadow: '-8px 0 0 #27272A',
              }}
            >
              0
            </span>
            <span
              style={{
                textShadow: '-8px 0 0 #27272A',
              }}
            >
              4
            </span>
          </Typography>
        </Box>
        <Typography
          component='h2'
          style={{
            color: 'rgb(0, 0, 0)',
          }}
        >
          we are sorry, but the page you requested was not found
        </Typography>
      </Box>
    </Box>
  )
}

export default NotFound
