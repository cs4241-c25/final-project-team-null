import {FormLabel} from "@mui/material";
import React from "react";

function FormLabelComponent({id, formLabel}) {

    return (
        <>
            <FormLabel id={id}>{formLabel}</FormLabel>
        </>
    )

}

export default FormLabelComponent