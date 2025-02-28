import React from "react";
import {Autocomplete, TextField} from "@mui/material";

function AutocompleteComponent({id, onChange, label, autocompleteChange, map, list, input, error, errorMessage}) {

    return (
        <>
            <Autocomplete
                id={id}
                freeSolo
                className="w-4/5 h-full"
                onChange={autocompleteChange}
                options={map(list)}
                renderInput={(params) =>
                    <TextField {...params} label={label}
                               value={input} onChange={onChange}
                               error={error} fullWidth
                               helperText={errorMessage}/>}
            />
        </>
    )

}

export default AutocompleteComponent