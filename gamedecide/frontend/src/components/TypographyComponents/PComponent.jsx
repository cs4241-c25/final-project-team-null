import {Typography} from "@mui/material";
import React from "react";


function PComponent({text, color}) {

    return (
        <>
            <Typography variant="p" component="p" color={color}>{text}</Typography>
        </>
    )

}

export default PComponent
