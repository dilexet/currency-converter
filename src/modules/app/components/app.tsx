import React from 'react';
import AppRoutes from "./app-routes";
import {Box, CssBaseline} from "@mui/material";
import FooterContainer from "../../footer/containers/footer-container";
import HeaderContainer from "../../header/containers/header-container";

const App = () => {
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', minHeight: '100vh'
        }}>
            <CssBaseline>
                <HeaderContainer/>
                <AppRoutes/>
                <FooterContainer/>
            </CssBaseline>
        </Box>
    );
}

export default App;
