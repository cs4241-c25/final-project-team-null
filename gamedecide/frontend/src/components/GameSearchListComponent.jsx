import GameSearchComponent from "./GameSearchComponent.jsx";
import {Box, Typography} from "@mui/material";
import GameSelectionComponent from "./GameSelectionComponent.jsx";
import React from "react";
import H2Component from "./TypographyComponents/H2Component.jsx";

function GameSearchListComponent({id, label, games, list, currentList, functions, h2Text}) {

    const gamesLibrary = currentList;

    return (
        <>
            <GameSearchComponent id={id} games={games} label={label}
                                 list={list} currentList={gamesLibrary} handleGameAdd={functions.handleGameAdd}/>
            <H2Component text={h2Text}/>
            <Box className="flex flex-col gap-2">
                {gamesLibrary.map(game => (
                    <GameSelectionComponent key={game.name + " (" + game.year + ")"} list={list}
                                            name={game.name} year={game.year}
                                            handleGameDelete={functions.handleGameDelete}/>
                ))}
            </Box>
        </>
    )

}

export default GameSearchListComponent