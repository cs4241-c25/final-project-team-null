import React from "react";
import SubmitButtonComponent from "./ButtonComponents/SubmitButtonComponent.jsx";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import {Box} from "@mui/material";
import GameSearchListComponent from "./GameSearchListComponent.jsx";

function ProfileFormComponent({profile, games, functions}) {


    return (
        <>
            <form className="flex flex-col justify-start items-center gap-4 w-full" onSubmit={functions.handleSubmit}>
                <Box className="w-full m-4">
                    <FormTextFieldComponent id="name" name="name" type={"text"}
                                            label="Profile Name" value={profile.name}
                                            onChange={functions.handleChange}/>
                </Box>
                <Box className="flex flex-col gap-4 w-full m-4">
                    <GameSearchListComponent id={"addLibrary"} games={games} label={"Add Game to Library"}
                                             list={"library"} currentList={profile.library}
                                             h2Text={"Current Games in Library"}
                                             functions={{
                                                 handleGameAdd: functions.handleGameAdd,
                                                 handleGameDelete: functions.handleGameDelete
                                             }}/>
                </Box>
                <Box className="flex flex-col gap-4 w-full m-4">
                    <GameSearchListComponent id={"addFavorite"} games={games} label={"Add Game to Favorites"}
                                             list={"favorites"} currentList={profile.favorites}
                                             h2Text={"Current Favorite Games"}
                                             functions={{
                                                 handleGameAdd: functions.handleGameAdd,
                                                 handleGameDelete: functions.handleGameDelete
                                             }}/>
                </Box>
                <Box className="flex flex-col gap-4 w-full m-4">
                    <GameSearchListComponent id={"addBlacklist"} games={games} label={"Add Game to Blacklist"}
                                             list={"blacklist"} currentList={profile.blacklist}
                                             h2Text={"Current Blacklisted Games"}
                                             functions={{
                                                 handleGameAdd: functions.handleGameAdd,
                                                 handleGameDelete: functions.handleGameDelete
                                             }}/>
                </Box>
                <SubmitButtonComponent/>
            </form>
        </>
    )
}

export default ProfileFormComponent