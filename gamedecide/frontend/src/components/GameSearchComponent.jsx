import {Autocomplete, Box, TextField} from "@mui/material";
import ActionButtonComponent from "./ButtonComponents//ActionButtonComponent.jsx";
import React, {useEffect, useState} from "react";

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

    return (
        <Box className="w-full flex flex-row align-center justify-between gap-2">
            <Autocomplete
                id={id}
                freeSolo
                className="w-4/5 h-full"
                onChange={handleAutocompleteChange}
                options={games.map((option) => option.name + " (" + option.year + ")")}
                renderInput={(params) =>
                    <TextField {...params} label={label}
                               value={input} onChange={handleChange}
                               error={error} fullWidth
                               helperText={errorMessage}/>}
            />
            <ActionButtonComponent className="w-1/5 h-full" text={"Add Game to List"} action={handleSubmit}/>
        </Box>
    )

}

export default GameSearchComponent


