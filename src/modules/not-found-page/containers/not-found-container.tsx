import React from 'react';
import {useTheme} from "@mui/material";
import NotFound from "../components/not-found";

const NotFoundContainer = () => {
    const theme = useTheme();
    return (
        <NotFound theme={theme}/>
    )
}

export default NotFoundContainer;