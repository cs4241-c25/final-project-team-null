import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "/backend";
//const BACKEND_URL = "/backend";

function UserProfiles({user}) {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axios.post(BACKEND_URL+"/getprofiles/", JSON.stringify({"username": user}))
            .then(res => {
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    function handleDelete(user, profile) {
        axios.delete(BACKEND_URL+"/deleteprofile/", {data: JSON.stringify({"username": user, "name": profile})})
            .then(res => {
                console.log("Deleted profile " + profile);
                const newProfiles = profiles.filter(item => item !== profile)
                setProfiles(newProfiles);
            })
            .catch(err => console.log(err));
    }

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <H1Component text={"User Profiles"}/>
            <Box sx={{ mt: 4 }} className="w-full flex flex-col gap-4">
                {profiles.map(item => (
                    <ProfileComponent key={item} user={user} profile={item} functions={{handleDelete: handleDelete}}/>
                ))}
            </Box>
            <RedirectButtonComponent link={"/createprofile"} text={"Create New Profile"}/>
        </Container>
    )

}

export default UserProfiles
