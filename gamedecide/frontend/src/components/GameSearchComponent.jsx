import {Autocomplete, TextField} from "@mui/material";

function GameSearchComponent({id, games, label, search, name}) {

    return (
        <>
            <Autocomplete
                id={id}
                freeSolo
                options={games.map((option) => option.name)}
                renderInput={(params) =>
                    <TextField {...params} label={label} onChange={search} name={name} />}
            />
        </>
    )

}

export default GameSearchComponent


