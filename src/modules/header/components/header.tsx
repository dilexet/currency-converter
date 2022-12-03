import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Box, Toolbar, Typography, Link as LinkMaterial} from '@mui/material';
import {HeaderComponentProps} from "../types/header-component-props";
import {CURRENCY_CONVERTER, CURRENCY_LIST} from "../constants/base-routes.constants";
import {APP_NAME} from "../../shared/constants/base.constants";

const Header: React.FC<HeaderComponentProps> = ({currentPath}) => {
    return (
        <Box>
            <AppBar
                position="static"
                color="default"
                elevation={0}>
                <Toolbar sx={{flexWrap: 'wrap'}}>
                    <Box>
                        <Typography variant="h6" color="inherit"
                                    style={{textDecoration: 'none', marginRight: "10px"}} component={Link} to='/'>
                            {APP_NAME}
                        </Typography>
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
                    <Box>
                        <LinkMaterial sx={{my: 1, mx: 1.5}}
                                      variant="button" component={Link}
                                      to={currentPath === CURRENCY_CONVERTER.path ? CURRENCY_LIST.path : CURRENCY_CONVERTER.path}
                                      style={{
                                          textDecoration: 'none',
                                          marginLeft: '20px',
                                          opacity: '0.9',
                                          fontSize: '1em',
                                          fontWeight: '400',
                                          textTransform: 'none'
                                      }}>
                            {currentPath === CURRENCY_CONVERTER.path ? CURRENCY_LIST.display : CURRENCY_CONVERTER.display}
                        </LinkMaterial>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;