
//props username
//getProfiles

//select profile

//send json of username, group, library
//Select library from a list of "Any" + List of Profile Names in Group

//receive list of games

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import ActionSelectorComponent from "./components/ActionSelectorComponent.jsx";

function Generate({user}) {

    const [groups, setGroups] = useState([{
        name: "",
        profiles: [""],
    }]);
    const [profiles, setProfiles] = useState([]);

    const [groupSelect, setGroupSelect] = useState([]);
    const [librarySelect, setLibrarySelect] = useState([]);

    const [game, setGame] = useState("");

    const [generation, setGeneration] = useState({
        username: user,
        groupName: "",
        profileName: ""
    });

    /*
    useEffect(() => {
        axios.post("/backend/getgroups/", JSON.stringify({"username": user}))
            .then(res => {
                setGroups(res.data);
            })
            .catch(err => console.log(err));
    }, [])*/

    useEffect(() => {
        setGroups([
            {name: "The Squad", profiles: ["Mary", "Sue", "Joan", "Henry"]},
            {name: "Snackies", profiles: ["Lilo", "Mitchell", "Cross", "Jude"]},
            {name: "PokePals", profiles: ["Starter", "Partner", "Duo", "Zwei"]},
            {name: "Just Vibin", profiles: ["Remi", "Emilia", "Scarlet", "Sugar"]},
        ]);
    }, [])

    useEffect(() => {
        console.log("profiles: ", profiles);
    }, [profiles])

    useEffect(() => {
        console.log("generation: ", generation);
    }, [generation])

    function handleGenerate() {
        axios.post("/backend/generate/", JSON.stringify(generation))
            .then(res => {
                setGame(res.data);
            })
            .catch(err => console.log(err));
    }

    function selectGroup(name) {
        const target = groups.find(group => group.name === name);
        console.log("name", name)
        console.log("target", target)
        setGeneration({...generation, groupName: name})
        setProfiles(target.profiles);
    }

    function selectLibrary(name) {
        setGeneration({...generation, profileName: name})
    }

    const mapGroups = (itemList) => itemList.map((option) => option.name);
    const mapProfiles = (itemList) => itemList.map((option) => option);

    const validGroup = (itemList, input) => itemList.find(item => item.name === input).name;
    const validProfile = (itemList, input) => itemList.find(item => item === input);


    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <H1Component text={"Generate"}/>
            <ActionSelectorComponent itemList={groups} label={"Select a Group"} text="View Group" map={mapGroups} validCheck={validGroup} action={selectGroup} />
            <ActionSelectorComponent itemList={profiles} label={"Select someone's Library"} text="Pick Library" map={mapProfiles} validCheck={validProfile} action={selectLibrary}/>
            <ActionButtonComponent text={"Generate"} action={handleGenerate}/>
            <H2Component text={game}/>
        </Container>
    )

    //Component to select a Group with all Profiles in next selection
    //Component to select a Library from a list, including any
    //Generate button
    //Output games
}

export default Generate