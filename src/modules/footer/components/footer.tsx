import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {APP_NAME} from '../../shared/constants/base.constants';
import {APP_DESCRIPTION} from "../constants/footer.constants";
import Copyright from "./copyright";

const Footer = () => {
    return (
        <Box component="footer"
             sx={{
                 py: 3,
                 px: 2,
                 mt: 'auto'
             }}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center" gutterBottom>
                    {APP_NAME}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    {APP_DESCRIPTION}
                </Typography>
                <Copyright/>
            </Container>
        </Box>
    );
}

export default Footer;