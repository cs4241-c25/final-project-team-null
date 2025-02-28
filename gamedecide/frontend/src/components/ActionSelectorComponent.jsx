import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Box, Container, TextField} from "@mui/material";
import H1Component from "./TypographyComponents/H1Component.jsx";
import ProfileComponent from "./ProfileComponent.jsx";
import RedirectButtonComponent from "./ButtonComponents/RedirectButtonComponent.jsx";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";
import AutocompleteComponent from "../AutocompleteComponent.jsx";

function ActionSelectorComponent({id, itemList, label, action, map, validCheck, text}) {

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
                <AutocompleteComponent id={id} autocompleteChange={handleAutocompleteChange} map={map} list={itemList}
                label={label} input={input} onChange={handleChange} error={error} errorMessage={errorMessage}/>
                <ActionButtonComponent className="w-1/5 h-full" text={text} action={handleSubmit}/>
            </Box>
        </>
    )

}

export default ActionSelectorComponent
