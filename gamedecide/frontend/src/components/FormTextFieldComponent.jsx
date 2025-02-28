import React from "react";
import {TextField} from "@mui/material";

function FormTextFieldComponent({id, name, label, type, value, onChange}) {

    return (
        <>
            <TextField className="w-full" id={id} name={name} label={label} type={type} value={value} onChange={onChange} variant="outlined" required />
        </>
    )

}

export default FormTextFieldComponent