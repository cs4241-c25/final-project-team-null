import React from "react";
import {TextField} from "@mui/material";

function FormNumberFieldComponent({id, name, label, value, onChange, min}) {

    return (
        <>
            <TextField className="w-full, p-0.5" id={id} name={name} label={label} type="number" InputProps={{
                inputProps: { min: min }
            }} value={value} onChange={onChange} variant="outlined" required />
        </>
    )

}

export default FormNumberFieldComponent