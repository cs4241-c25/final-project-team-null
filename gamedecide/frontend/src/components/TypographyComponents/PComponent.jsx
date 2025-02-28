import {Typography} from "@mui/material";
import React from "react";


function PComponent({text}) {

    return (
        <>
            <Typography variant="p" component="p">{text}</Typography>
        </>
    )

}

export default PComponent
