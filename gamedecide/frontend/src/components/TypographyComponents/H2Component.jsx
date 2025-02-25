import {Typography} from "@mui/material";
import React from "react";


function H2Component({text}) {

    return (
        <>
            <Typography variant="h5" component="h2">{text}</Typography>
        </>
    )

}

export default H2Component
