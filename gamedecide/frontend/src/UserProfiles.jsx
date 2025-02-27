import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";

function UserProfiles({user}) {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axios.post("/backend/getprofiles/", JSON.stringify({"username": user}))
            .then(res => {
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
        <H1Component text={"User Profiles"}/>
        <Box sx={{ mt: 4 }}>
             {profiles.map(item => (
                 <ProfileComponent key={item} profile={item}/>
             ))}
        </Box>
        <RedirectButtonComponent link={"/createprofile"} text={"Create New Profile"}/>
        </Container>
    )

}

export default UserProfiles
