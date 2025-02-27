import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import ActionSelectorComponent from "./components/ActionSelectorComponent.jsx";
import H2Component from "./components/TypographyComponents/H2Component.jsx";


function Generate({user}) {

    const [groups, setGroups] = useState([""]);
    const [profiles, setProfiles] = useState([]);

    const [groupSelect, setGroupSelect] = useState({name: "", profiles: []});
    const [librarySelect, setLibrarySelect] = useState([]);

    const [game, setGame] = useState("");

    const [generation, setGeneration] = useState({
        username: user,
        groupName: "",
        library: {username: "", name: ""}
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
        setGroups(["The Squad", "Snackies", "PokePals", "Just Vibin"]);
    }, [])

    useEffect(() => {
        console.log("groupSelect: ", groupSelect);
    }, [groupSelect])

    useEffect(() => {
        console.log("profiles: ", profiles);
    }, [profiles])

    useEffect(() => {
        console.log("generation: ", generation);
    }, [generation])

    function handleGenerate() {
        /*
        axios.post("/backend/generate/", JSON.stringify(generation))
            .then(res => {
                setGame(res.data);
            })
            .catch(err => console.log(err));*/
        setGame("Pokemon Reborn");
    }

    function selectGroup(name) {
        const target = groups.find(group => group === name);
        console.log("name", name)
        console.log("target", target)

        /*
        axios.post("/backend/editgroup/", JSON.stringify({username: user, groupName: target}))
            .then(res => {
                setGroupSelect(res.data);
            })
            .catch(err => console.log(err));*/
        //editGroups
        setGroupSelect({name: "The Squad", profiles: [
                {username: "a", name:"a"},
                {username: "b", name:"b"},
                {username: "c", name:"c"},
                {username: "d", name:"d"},]});

        setGeneration({...generation, groupName: name})
    }

    useEffect(() => {
        if(groupSelect) {
            const tempProfiles = groupSelect.profiles;
            tempProfiles.unshift({username: "", name: "Any"});
            setProfiles(tempProfiles);
        }
    }, [groupSelect])

    function selectLibrary(profile) {
        setGeneration({...generation, library: {username: profile.username, name: profile.name}})
    }

    const mapGroups = (itemList) => itemList.map((option) => option);
    const mapProfiles = (itemList) => itemList.map((option) => option.username === "" ? "Any" : option.name + " (" + option.username + ")");

    const validGroup = (itemList, input) => itemList.find(item => item === input);
    const validProfile = (itemList, input) => itemList.find(item => (item.name === "Any" && input === "Any") || item.name + " (" + item.username + ")" === input);


    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <H1Component text={"Generate"}/>
            <Box className="flex flex-col gap-4 w-full m-4">
                <H2Component text={"Current Group: " + groupSelect.name}/>
                <ActionSelectorComponent itemList={groups} label={"Select a Group"} text="View Group" map={mapGroups} validCheck={validGroup} action={selectGroup} />
            </Box>
            {groupSelect.name !== "" && groupSelect.profiles.length !== 0 &&
                <Box className="flex flex-col gap-4 w-full m-4">
                    <H2Component text={"Current Profile: " + (generation.library.username === "" ?
                        generation.library.name : generation.library.name + " (" + generation.library.username + ")")}/>
                    <ActionSelectorComponent itemList={profiles} label={"Select Someone's Library"} text="Pick Library" map={mapProfiles} validCheck={validProfile} action={selectLibrary}/>
                </Box>
            }
            {groupSelect.name !== "" && groupSelect.profiles.length !== 0 &&
                <Box className="flex flex-col gap-4 w-full m-4">
                    <H2Component text={"Current Platform: " + ""}/>
                </Box>
            }
            <ActionButtonComponent text={"Generate"} action={handleGenerate}/>
            <H2Component text={game}/>
        </Container>
    )

    //Component to select a Group with all Profiles in next selection
    //Component to select a Library from a list, including any
    //Component to select a Platform
    //Generate button
    //Output games

}

export default Generate


//Add Any to Profile List (and also Platform list)