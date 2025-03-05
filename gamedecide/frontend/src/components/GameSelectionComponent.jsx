import ActionButtonComponent from "./ButtonComponents//DeleteButtonComponent.jsx";
import {Box, Typography} from "@mui/material";
import React from "react";
import PComponent from "./TypographyComponents/PComponent.jsx";

function GameSelectionComponent({list, name, year, handleGameDelete}) {

    const text = name + " (" + year + ")";
    return (
        <>
            <Box className="w-full flex flex-row align-center justify-between p-4 rounded-md" bgcolor="itemBG.main">
                <PComponent className="text-base" text={text}/>
                <ActionButtonComponent action={() => handleGameDelete(list, name, year)}/>
            </Box>
        </>
    )

}

export default GameSelectionComponent
