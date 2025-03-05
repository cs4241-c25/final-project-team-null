import {ThemeProvider, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme.js";


function H2Component({text, color}) {

    return (
        <>
            <Typography variant="h4" component="h2" color={color}>{text}</Typography>
        </>
    )

}

export default H2Component
