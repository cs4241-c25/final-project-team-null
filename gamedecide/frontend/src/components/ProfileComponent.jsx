import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import React, {useEffect} from "react";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";
import {useNavigate} from "react-router-dom";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";
import axios from "axios";


function ProfileComponent({profile, functions}) {

    return (
        <>
            <Box className="w-full flex flex-row items-center justify-between p-4 rounded-md"  bgcolor="itemBG.main">
                <PComponent text={profile} />
                <Box className="flex flex-row gap-4">
                    {functions.handleRedirect &&
                        <ActionButtonComponent action={() => functions.handleRedirect(profile)} text="Edit"/>
                    }
                    <DeleteButtonComponent action={() => functions.handleDelete(profile)}/>
                </Box>
            </Box>
        </>
    )

}

export default ProfileComponent
