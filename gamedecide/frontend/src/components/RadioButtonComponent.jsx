import {FormControlLabel, Radio} from "@mui/material";
import React from "react";

function RadioButtonComponent({value, required}) {

    return (
        <>
            <FormControlLabel value={value} control={<Radio required={required} />} label={value}/>
        </>
    )

}

export default RadioButtonComponent