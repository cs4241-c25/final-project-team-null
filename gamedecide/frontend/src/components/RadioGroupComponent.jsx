import {FormControl, RadioGroup} from "@mui/material";
import React from "react";
import RadioButtonComponent from "./RadioButtonComponent.jsx";
import FormLabelComponent from "./FormLabelComponent.jsx";


function RadioGroupComponent({id, formLabel, buttons, value, onChange, name, required}) {

    return (
        <>
            <FormControl>
                <FormLabelComponent id={id} formLabel={formLabel}/>
                <RadioGroup row value={value} name={name} onChange={onChange} className="flex flex-row justify-evenly items-center">
                    {buttons.map(item => (
                        <RadioButtonComponent key={id + "-" + item} value={item} required={required}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )

}

export default RadioGroupComponent