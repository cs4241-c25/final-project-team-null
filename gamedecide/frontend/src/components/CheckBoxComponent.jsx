import {FormControlLabel, Checkbox} from "@mui/material";
import React from "react";

function CheckBoxComponent({value, id}) {

    return (
        <>
            <FormControlLabel value={value} control={<Checkbox id={id}/>} label={value}/>
        </>
    )

}

export default CheckBoxComponent