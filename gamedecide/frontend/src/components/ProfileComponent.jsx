import {Box} from "@mui/material";
import PComponent from "./TypographyComponents/PComponent.jsx";
import React from "react";
import DeleteButtonComponent from "./ButtonComponents/DeleteButtonComponent.jsx";
import {useNavigate} from "react-router-dom";
import ActionButtonComponent from "./ButtonComponents/ActionButtonComponent.jsx";


function ProfileComponent({user, profile, functions}) {
    const navigate = useNavigate();

    function handleRedirect() {
        navigate("/editprofile", {state: {username: user, name: profile}});
    }

    return (
        <>
            <Box className="w-full flex flex-row items-center justify-between p-4 rounded-md"  bgcolor="itemBG.main">
                <PComponent text={profile} />
                <Box className="flex flex-row gap-4">
                    <ActionButtonComponent action={handleRedirect} text="Edit"/>
                    <DeleteButtonComponent action={() => functions.handleDelete(user, profile)}/>
                </Box>
            </Box>
        </>
    )

}

export default ProfileComponent
