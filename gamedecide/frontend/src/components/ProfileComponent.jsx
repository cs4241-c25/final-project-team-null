import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import React from "react";
import RedirectButtonComponent from "./ButtonComponents/RedirectButtonComponent.jsx";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";


function ProfileComponent({profile}) {

    function handleDelete() {
        return 0;
    }

    return (
        <>
            <Box>
                <PComponent text={profile}/>
                <RedirectButtonComponent link="/editprofile" text="Edit"/>
                <DeleteButtonComponent action={handleDelete}/>
            </Box>
        </>
    )

}

export default ProfileComponent
