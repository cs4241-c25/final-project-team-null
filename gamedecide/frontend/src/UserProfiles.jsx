import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import {useNavigate} from "react-router-dom";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "/backend";
//const BACKEND_URL = "/backend";

function UserProfiles({user}) {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axios.post("/getprofiles/", JSON.stringify({"username": user}))
            .then(res => {
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();
    function handleRedirect(username, profile) {
        navigate("/editprofile", {state: {username: user, name: profile}});
    }

    function handleDelete(user, profile) {
        axios.delete("/deleteprofile/", {data: JSON.stringify({"username": user, "name": profile})})
            .then(res => {
                console.log("Deleted profile " + profile);
                const newProfiles = profiles.filter(item => item !== profile)
                setProfiles(newProfiles);
            })
            .catch(err => console.log(err));
    }

    return (
        <Container maxWidth="sm" className="h-full flex flex-col justify-center items-center my-8 gap-4 p-4 rounded-md">
            <H1Component text={"User Profiles"}/>
            <Box className="w-full flex flex-col gap-4 m-4 p-8 rounded-md items-center" bgcolor="cardBG.main"
                 sx={{
                     mt: 4,
                     height: 500,
                     overflow: "hidden",
                     overflowY: "scroll",
                 }}>
                {profiles.map(item => (
                    <ProfileComponent key={item} user={user} profile={item} functions={{handleRedirect: handleRedirect,
                        handleDelete: handleDelete}}/>
                ))}
            </Box>
            <RedirectButtonComponent link={"/createprofile"} text={"Create New Profile"}/>
        </Container>
    )

}

export default UserProfiles
