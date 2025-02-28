import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import DeleteButtonComponent from "./components/ButtonComponents/DeleteButtonComponent.jsx";
import React from "react";


function GameComponent({game, functions}) {
    const navigate = useNavigate();

    function handleRedirect() {
        navigate("/editgame", {state: {game}});
    }

    return (
        <>
            <Box className="flex flex-row items-center justify-between">
                <PComponent text={game.name + " (" + game.year + ")"}/>
                <Box className="flex flex-row gap-4">
                    <ActionButtonComponent action={handleRedirect} text="Edit"/>
                    <DeleteButtonComponent action={() => functions.handleDelete(game)}/>
                </Box>
            </Box>
        </>
    )

}

export default GameComponent