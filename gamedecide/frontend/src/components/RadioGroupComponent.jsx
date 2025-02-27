import {FormControl, RadioGroup} from "@mui/material";
import React from "react";
import RadioButtonComponent from "./RadioButtonComponent.jsx";
import FormLabelComponent from "./FormLabelComponent.jsx";


function RadioGroupComponent({id, formLabel, buttons, value, onChange}) {

    return (
        <>
            <FormControl>
                <FormLabelComponent id={id} formLabel={formLabel} />
                <RadioGroup row value={value} onChange={onChange} className="flex flex-row justify-evenly items-center">
                    {buttons.map(item => (
                        <RadioButtonComponent value={item}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )

}

export default RadioGroupComponent