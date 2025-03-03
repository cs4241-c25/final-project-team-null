import React, {useEffect, useState} from "react";
import axios from "axios";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import {Box, Container} from "@mui/material";
import AutocompleteComponent from "./components/AutocompleteComponent.jsx";
import GameComponent from "./components/GameComponent.jsx";

function GameSearch({user}) {

    const [games, setGames] = useState([{
        name: "",
        year: 0,
        minPlayerCount: 0,
        maxPlayerCount: 0,
        platform: "",
        ownershipType: ""
    }]);
    const [filteredGames, setFilteredGames] = useState([{
        name: "",
        year: 0,
        minPlayerCount: 0,
        maxPlayerCount: 0,
        platform: "",
        ownershipType: ""
    }]);

    const [search, setSearch] = useState("");



    useEffect(() => {
        axios.post("/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
            })
            .catch(err => console.log(err));
    }, [])

    //useEffect for when search is changed to rerender list with a filter
    useEffect(() => {
        let searchedGames = games;

        if (search) {
            searchedGames = searchedGames.filter(game => (game.name + " (" + game.year + ")").includes(search));
        }

        setFilteredGames(searchedGames);
    }, [games, search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleAutocompleteChange = (event, value) => {
        setSearch(value);
    }

    const mapGames = (itemList) => itemList.map((option) => option.name + " (" + option.year + ")");

    function handleDelete(game) {
        axios.delete("/deletegame/", {data: JSON.stringify({"name": game.name, "year": game.year})})
            .then(res => {
                console.log("Deleted game " + game);
                const newGames = games.filter(item => !((item.name === game.name) && (item.year === game.year)))
                setGames(newGames);
            })
            .catch(err => console.log(err));
    }


    return (
        <>
            <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
                <H1Component text={"Search for Games"}/>
                <AutocompleteComponent id={"gamesSearch"} label={"Search for Games"} map={mapGames} list={games}
                input={search} onChange={handleSearch} autocompleteChange={handleAutocompleteChange} error={false} errorMessage={""}/>
                <Box sx={{ mt: 4 }} className="w-full flex flex-col gap-4">
                    {filteredGames.map(game => (
                        <GameComponent key={game.name + "(" + game.year + ")"} game={game} functions={{handleDelete: handleDelete}}/>
                    ))}
                </Box>
                <RedirectButtonComponent link={"/createboardgame"} text={"Create New Game"}/>
            </Container>
        </>
    )
}

//Autocomplete text input
//Box of Components w/ Scroll

//Button


//Search to Look for Games
//List of all Games
//Each Game has the ability to Edit or Delete it
//Has a Button to go to Add New Game

export default GameSearch