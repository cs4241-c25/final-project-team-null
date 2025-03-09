import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GroupComponent from './components/GroupComponent';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "/backend";

function UserGroups({user}) {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.post("/getgroups/", JSON.stringify({"username": user}))
            .then(res => {
                setGroups(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    function handleDelete(user, group) {
        axios.delete("/deletegroup/", {data: JSON.stringify({"username": user, "name": group})})
            .then(res => {
                console.log("Deleted group " + group);
                const newGroups = groups.filter(item => item !== group)
                setGroups(newGroups);
            })
            .catch(err => console.log(err));
    }

    return (
        <Container maxWidth="sm" className="h-full flex flex-col justify-center items-center my-8 gap-4 p-4 rounded-md">
            <H1Component text={"Groups"}/>
            <Box className="w-full flex flex-col gap-4 m-4 p-8 rounded-md items-center" bgcolor="cardBG.main"
                 sx={{
                     mt: 4,
                     height: 500,
                     overflow: "hidden",
                     overflowY: "scroll",
                 }}>
                {groups.map(item => (
                    <GroupComponent key={item} user={user} group={item} functions={{handleDelete: handleDelete}}/>
                ))}
            </Box>
            <RedirectButtonComponent link={"/creategroup"} text={"Create New Group"}/>
        </Container>
    )

}

export default UserGroups