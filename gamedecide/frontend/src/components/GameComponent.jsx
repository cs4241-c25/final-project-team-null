import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";
import React from "react";


function GameComponent({game, functions}) {
    const navigate = useNavigate();

    function handleRedirect() {
        console.log(game)
        navigate("/editgame", {state: {
                name: game.name,
                minplayers: game.minplayers,
                maxplayers: game.maxplayers
            }});
    }

    return (
        <>
            <Box className="w-full flex flex-row items-center justify-between p-4 rounded-md" bgcolor="itemBG.main">
                <PComponent text={game.name}/>
                <Box className="flex flex-row gap-4">
                    <ActionButtonComponent action={handleRedirect} text="Edit"/>
                    <DeleteButtonComponent action={() => functions.handleDelete(game)}/>
                </Box>
            </Box>
        </>
    )

}

export default GameComponent