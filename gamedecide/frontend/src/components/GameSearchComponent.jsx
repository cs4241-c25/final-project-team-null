import {Autocomplete, Box, TextField} from "@mui/material";
import ActionButtonComponent from "./ButtonComponents//ActionButtonComponent.jsx";
import React, {useEffect, useState} from "react";
import AutocompleteComponent from "./AutocompleteComponent.jsx";

function GameSearchComponent({id, games, label, list, currentList, handleGameAdd}) {

    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    function handleSubmit() {
        const existsAlready = currentList.find(game => game.name + " (" + game.year + ")" === input);
        const isValidGame = games.find(game => (game.name + " (" + game.year + ")" === input));
        if(existsAlready) {
            setError(true);
            setErrorMessage("Game already exists in list.");
        }
        else if(isValidGame)
        {
            handleGameAdd(list, isValidGame.name, isValidGame.year);
            setError(false);
            setErrorMessage("");
        }
        else {
            setError(true);
            setErrorMessage("Please input a valid game.");
        }
    }

    const handleChange = (e) => {
        const {value} = e.target;
        setInput(value);
    }

    const handleAutocompleteChange = (event, value) => {
        setInput(value);
    }

    const mapGames = (itemList) => itemList.map((option) => option.name + " (" + option.year + ")");

    return (
        <Box className="w-full flex flex-row align-center justify-between gap-2">
            <AutocompleteComponent id={id} autocompleteChange={handleAutocompleteChange} map={mapGames} list={games}
                                   label={label} input={input} onChange={handleChange} error={error} errorMessage={errorMessage}/>
            <ActionButtonComponent className="w-1/5 h-full" text={"Add Game to List"} action={handleSubmit}/>
        </Box>
    )

}
export default GameSearchComponent


