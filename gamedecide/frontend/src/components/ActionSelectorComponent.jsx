import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Box, Container, TextField} from "@mui/material";
import H1Component from "./TypographyComponents/H1Component.jsx";
import ProfileComponent from "./ProfileComponent.jsx";
import RedirectButtonComponent from "./ButtonComponents/RedirectButtonComponent.jsx";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";

function ActionSelectorComponent({itemList, label, action, map, validCheck, text}) {

    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit() {
        const isValid = validCheck(itemList, input);
        if(isValid)
        {
            action(isValid);
            setError(false);
            setErrorMessage("");
        }
        else {
            setError(true);
            setErrorMessage("Please input a valid input from the list.");
        }
    }
    const handleChange = (e) => {
        const {value} = e.target;
        setInput(value);
    }

    const handleAutocompleteChange = (event, value) => {
        setInput(value);
    }

    return (
        <>
            <Box className="w-full flex flex-row align-center justify-between gap-2">
                <Autocomplete
                    freeSolo
                    className="w-4/5 h-full"
                    onChange={handleAutocompleteChange}
                    options={map(itemList)}
                    renderInput={(params) =>
                        <TextField {...params} label={label}
                                   value={input} onChange={handleChange}
                                   error={error} fullWidth
                                   helperText={errorMessage}/>}
                />
                <ActionButtonComponent className="w-1/5 h-full" text={text} action={handleSubmit}/>
            </Box>
        </>
    )

}

export default ActionSelectorComponent
