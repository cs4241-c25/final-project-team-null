import H1Component from "./H1Component.jsx";
import H2Component from "./H2Component.jsx";
import React from "react";
import {Typography} from "@mui/material";


function HeroTextComponent({h1Text, h2Text, color}) {

    return (
        <>
            <Typography variant="h2" component="h1" color={color} gutterBottom>{h1Text}</Typography>
            <Typography variant="h3" component="h2" color={color}>{h2Text}</Typography>
        </>
    )

}

export default HeroTextComponent