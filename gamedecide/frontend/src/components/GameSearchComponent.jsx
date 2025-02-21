import {Autocomplete, TextField} from "@mui/material";
import ActionButtonComponent from "./ActionButtonComponent.jsx";
import {useEffect, useState} from "react";

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
        <>
            <Autocomplete
                id={id}
                freeSolo
                onChange={handleAutocompleteChange}
                options={games.map((option) => option.name + " (" + option.year + ")")}
                renderInput={(params) =>
                    <TextField {...params} label={label}
                               value={input} onChange={handleChange}
                               error={error}
                               helperText={errorMessage}/>}
            />
            <ActionButtonComponent text={"Add"} action={handleSubmit}/>
        </>
    )

}

export default GameSearchComponent


