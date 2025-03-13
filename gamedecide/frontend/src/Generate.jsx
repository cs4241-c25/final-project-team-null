import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container, FormControl, FormLabel} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import ActionSelectorComponent2 from "./components/ActionSelectorComponent2.jsx";
import H2Component from "./components/TypographyComponents/H2Component.jsx";
import RadioGroupComponent from "./components/RadioGroupComponent.jsx";
import CheckBoxComponent from "./components/CheckBoxComponent.jsx";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import FormNumberFieldComponent from "./components/FormNumberFieldComponent.jsx";


function Generate() {
    const [lengths, setLengths] = useState({});
    const [numExtraPlayers, setNumExtraPlayers] = useState(0);
    const [groupMembers, setGroupMembers] = useState([]);
    const [profiles, setProfiles] = useState([]);

    const [groupSelect, setGroupSelect] = useState({name: "", profiles: []});

    const [games, setGames] = useState([{
        name: "",
        minplayers: 0,
        maxplayers: 0,
        length: "Medium"
    }]);


    function handleGenerate() {
        const generation = {group: groupMembers, length: lengths, extras: numExtraPlayers};
        console.log(generation);
        axios.post("/generate/", JSON.stringify(generation))
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

    const handleCheckChange = (e) => {
        const { name, checked} = e.target;
        setLengths(prev => ({ ...prev, [name]: checked }));
    };

    const handleChange = (e) => {
        const { name, value} = e.target;
        setNumExtraPlayers(value);
    }


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
                <FormNumberFieldComponent
                    id="extraPlayers"
                    label="Extra Players"
                    name="extraplayers"
                    value={numExtraPlayers}
                    onChange={handleChange}
                    className="w-1/3 h-full"
                    min={0}
                />
                <FormControl component="fieldset" margin="normal">
                    <Box className="flex flex-col justify-start items-center gap-4 w-full">
                        <FormLabel component="legend">Length</FormLabel>
                        <Box className="flex flex-row justify-evenly items-center">
                            <CheckBoxComponent label="Short" id="short" name="Short" onChange={handleCheckChange}/>
                            <CheckBoxComponent label="Medium" id="medium" name="Medium" onChange={handleCheckChange}/>
                            <CheckBoxComponent label="Long" id="long" name="Long" onChange={handleCheckChange}/>
                        </Box>
                    </Box>
                </FormControl>
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