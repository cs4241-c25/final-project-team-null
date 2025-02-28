import React, {useEffect, useState} from "react";
import axios from "axios";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import {Box, Container} from "@mui/material";

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
        axios.post("/backend/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
            })
            .catch(err => console.log(err));
    }, [])

    //useEffect for when search is changed to rerender list with a filter
    /*
    useEffect(() => {
        let searchedGames = games;

        if (search) {
            searchedGames = searchedGames.filter(game => );
        }

        setFilteredGames(searchedGames);
    }, [search])*/

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    return (
        <>
            <Container>
                <H1Component text={"Search for Games"}/>

                <Box>

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