import {ThemeProvider, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme.js";

function H1Component({text, color}) {

    return (
        <>
            <Typography variant="h3" component="h1" color={color} gutterBottom>{text}</Typography>
        </>
    )

}

export default H1Component
