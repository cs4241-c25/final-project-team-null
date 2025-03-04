import {ThemeProvider, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme.js";

function H1Component({text}) {

    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>{text}</Typography>
        </>
    )

}

export default H1Component
