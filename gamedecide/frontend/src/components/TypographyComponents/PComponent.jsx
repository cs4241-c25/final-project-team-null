import {ThemeProvider, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme.js";


function PComponent({text, color}) {

    return (
        <>
            <Typography variant="h6" component="p" color={color}>{text}</Typography>
        </>
    )

}

export default PComponent
