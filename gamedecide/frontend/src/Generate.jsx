import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import ActionSelectorComponent2 from "./components/ActionSelectorComponent2.jsx";
import H2Component from "./components/TypographyComponents/H2Component.jsx";
import RadioGroupComponent from "./components/RadioGroupComponent.jsx";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";


function Generate() {

    const [groupMembers, setGroupMembers] = useState([]);
    const [profiles, setProfiles] = useState([]);

    const [groupSelect, setGroupSelect] = useState({name: "", profiles: []});

    const [games, setGames] = useState([{
        name: "",
        minplayers: 0,
        maxplayers: 0
    }]);


    function handleGenerate() {
        axios.post("/generate/", JSON.stringify(groupMembers))
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.post("/getallprofiles")
            .then(res => {
                const tempProfiles = res.data;
                setProfiles(tempProfiles);
            })
            .catch(err => console.log(err));
    })


    const mapProfiles = (itemList) =>
        itemList.map((option) => option.name);

    function selectProfile(name) {
        let profile = profiles.find(profile => profile.name === name);
        console.log(profile);
        if (!profile) return; // Avoid errors if profile is not found

        // Prevent duplicates
        if (!groupMembers.some(member => member.name === profile.name)) {
            setGroupMembers([...groupMembers, profile]);
        }
    }

    function handleDelete(profile){
        console.log(profile);
        const newProfiles = groupMembers.filter(item => item.name !== profile)
        console.log(newProfiles);
        setGroupMembers(newProfiles);
    }


    return (
        <Container maxWidth="sm" className="w-full flex flex-col justify-center items-center my-8 gap-4">
            <H1Component text={"Generate"}/>
            <Box className="flex flex-col gap-4 w-full m-4 p-8 rounded-md items-center" bgcolor="cardBG.main">
                {/* Search / Select Component */}
                <ActionSelectorComponent2
                    id="profileSelector"
                    itemList={profiles}
                    label="Select a Profile"
                    text="Add Profile"
                    map={mapProfiles}
                    action={selectProfile}
                />

                {/* Dynamically display selected group members using ProfileComponent */}
                <Box className="w-full flex flex-col gap-2" sx={{
                    height: 300,
                    overflow: "hidden",
                    overflowY: "scroll",
                }}>
                    {groupMembers.map((member) => (
                        <ProfileComponent
                            profile={member.name}
                            functions={{handleDelete}}
                        />
                    ))}
                </Box>
            </Box>

            <Box className="flex flex-col gap-2 w-full m-4 p-8 rounded-md items-center" bgcolor="cardBG.main">
                <ActionButtonComponent text={"Generate"} action={handleGenerate} importance={"primary"} />
            </Box>

            {games.length !== 0 &&
                <Box className="flex flex-col gap-2 w-full m-4 p-8 rounded-md items-center" bgcolor="cardBG.main">
                    <H2Component text={"Selected Games"}/>
                    {games.map(item => (
                        <PComponent text={item.name}/>
                    ))}
                </Box>
            }
        </Container>
    )
}

export default Generate