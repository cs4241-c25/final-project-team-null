import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";
import React, {useState} from "react";


function GameComponent({game, functions}) {
    const navigate = useNavigate();

    function handleRedirect() {
        console.log(game)
        navigate("/editgame", {state: {
                name: game.name,
                description: game.description,
                year: game.year,
                platform: game.platform,
                ownership: game.ownership,
                minplayers: game.minplayers,
                maxplayers: game.maxplayers
            }});
    }

    return (
        <>
            <Box className="flex flex-row items-center justify-between p-4 rounded-md" bgcolor="itemBG.main">
                <PComponent text={game.name + " (" + game.year + ")"} />
                <Box className="flex flex-row gap-4">
                    <ActionButtonComponent action={handleRedirect} text="Edit"/>
                    <DeleteButtonComponent action={() => functions.handleDelete(game)}/>
                </Box>
            </Box>
        </>
    )

}

export default GameComponent