import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import React, {useEffect} from "react";
import RedirectButtonComponent from "./ButtonComponents/RedirectButtonComponent.jsx";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";
import axios from "axios";


function ProfileComponent({user, profile, handleDelete}) {

    return (
        <>
            <Box className="flex flex-row items-center justify-between">
                <PComponent text={profile}/>
                <Box className="flex flex-row gap-4">
                    <RedirectButtonComponent link="/editprofile" text="Edit"/>
                    <DeleteButtonComponent action={() => handleDelete(user, profile)}/>
                </Box>
            </Box>
        </>
    )

}

export default ProfileComponent
