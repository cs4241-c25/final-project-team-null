import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import ActionSelectorComponent from "./components/ActionSelectorComponent.jsx";
import H2Component from "./components/TypographyComponents/H2Component.jsx";
import RadioGroupComponent from "./components/RadioGroupComponent.jsx";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import RadioButtonComponent from "./components/RadioButtonComponent.jsx";
import FormTextFieldComponent from "./components/FormTextFieldComponent.jsx";
import SubmitButtonComponent from "./components/ButtonComponents/SubmitButtonComponent.jsx";
import AutocompleteComponent from "./components/AutocompleteComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import ActionSelectorComponent2 from "./components/ActionSelectorComponent2.jsx";

function CreateGroup({ user }) {
    const [formData, setFormData] = useState({
        name: '',
        members: [],
    });

    const [profiles, setProfiles] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);

    // Fetch profiles once when the component mounts
    useEffect(() => {
        axios.post("/getallprofiles/", JSON.stringify(""))
            .then(res => setProfiles(res.data))
            .catch(err => console.error("Error fetching profiles:", err));
    }, []); // Empty dependency array ensures it only runs once

    const mapProfiles = (itemList) =>
        itemList.map((option) => option.name + " (" + option.username + ")");

    function selectProfile(name) {
        let profile = profiles.find(profile => profile.name === name);
        if (!profile) return; // Avoid errors if profile is not found

        // Prevent duplicates
        if (!groupMembers.some(member => member.username === profile.username && member.name === profile.name)) {
            setGroupMembers([...groupMembers, profile]);
        }
    }

    function handleDelete(username, profileName) {
        setGroupMembers(groupMembers.filter(member => member.username !== username));
    }

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <H1Component text={"Create New Group"} />

            <FormTextFieldComponent
                label="Group Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

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
            <Box className="w-full flex flex-col gap-2">
                {groupMembers.map((member) => (
                    <ProfileComponent 
                        key={member.username}
                        user={user} 
                        profile={member.name} 
                        functions={{ handleDelete }}
                    />
                ))}
            </Box>

            <SubmitButtonComponent />
        </Container>
    );
}

export default CreateGroup;
