import {FormControlLabel, Checkbox} from "@mui/material";
import React from "react";

function CheckBoxComponent({value, label, id, onChange, name}) {

    if(value){
        return (
            <>
                <FormControlLabel value={label} control={<Checkbox name={name} id={id} onChange={onChange} defaultChecked/>} label={label}/>
            </>
        )
    }
    else{
        return (
            <>
                <FormControlLabel value={label} control={<Checkbox name={name} id={id} onChange={onChange}/>} label={label}/>
            </>
        )
    }


}

export default CheckBoxComponent