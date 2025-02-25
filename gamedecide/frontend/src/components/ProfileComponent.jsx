import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import React from "react";


function ProfileComponent({profile}) {

    return (
        <>
            <Box>
                <PComponent text={profile}/>
            </Box>
        </>
    )

}

export default ProfileComponent
