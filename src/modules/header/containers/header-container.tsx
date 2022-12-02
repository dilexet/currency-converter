import React from 'react';
import Header from "../components/header";
import {useLocation} from "react-router-dom";

const HeaderContainer = () => {
    const location = useLocation();
    return (
        <Header currentPath={location.pathname}/>
    )
}

export default HeaderContainer;