import {FormControlLabel, Radio} from "@mui/material";
import React from "react";

function RadioButtonComponent({value}) {

    return (
        <>
            <FormControlLabel value={value} control={<Radio />} label={value}/>
        </>
    )

}

export default RadioButtonComponent