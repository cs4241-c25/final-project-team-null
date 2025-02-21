import {Autocomplete, TextField} from "@mui/material";

function GameSearchComponent({id, games, label, name}) {

    return (
        <>
            <Autocomplete
                id={id}
                freeSolo
                options={games.map((option) => option.name + " (" + option.year + ")")}
                renderInput={(params) =>
                    <TextField {...params} label={label} />}
            />
        </>
    )

}

export default GameSearchComponent


