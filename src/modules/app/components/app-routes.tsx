import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import RoutesArray from "../constants/routes-array";

const AppRoutes = () => {
    return (
        <Routes>
            {
                RoutesArray.map((value, index) =>
                    <Route path={value.path} element={value.element} key={index}/>
                )
            }
        </Routes>
    )
}

export default AppRoutes;