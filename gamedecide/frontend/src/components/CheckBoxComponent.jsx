import {FormControlLabel, Checkbox} from "@mui/material";
import React from "react";

function CheckBoxComponent({value, label, id}) {

    return (
        <>
            <FormControlLabel value={label} control={<Checkbox value={value} id={id}/>} label={label}/>
        </>
    )

}

export default CheckBoxComponent