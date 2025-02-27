import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";
function EditProfile({user}) {

    const [profile, setProfile] = useState();
    const location = useLocation();

    useEffect(() => {
        const {username, name} = location.state || {};
        console.log("username: ", username)
        console.log("name: ", name)
        axios.post("/backend/editprofile/", JSON.stringify({"username": user, "name": name}))
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log("profile: ", profile)
    }, [profile])

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">

        </Container>
    )

}

export default EditProfile
