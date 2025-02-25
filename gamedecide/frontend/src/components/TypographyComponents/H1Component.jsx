import {Typography} from "@mui/material";
import React from "react";


function H1Component({text}) {

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>{text}</Typography>
        </>
    )

}

export default H1Component
