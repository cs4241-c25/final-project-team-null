import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GameFormComponent from "./components/GameFormComponent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import FormTextFieldComponent from "./components/FormTextFieldComponent.jsx";
import SubmitButtonComponent from "./components/ButtonComponents/SubmitButtonComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import ActionSelectorComponent2 from "./components/ActionSelectorComponent2.jsx";

function EditGroup({ user }) {

    const navigate = useNavigate();

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







    const location = useLocation();
    useEffect(() => {
        const { name, description, year, platform, ownership, minplayers, maxplayers } = location.state || {};
        const group = { name: "", profiles: [{ username: "", name: "" }], oldname: "" }
        group.oldname = name;
        console.log("game: ", group)
        setFormData(group);
        setGroupMembers(group.profiles);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify(formData);
        fetch('/updategroups', {
            method: "POST",
            body
        }).then(navigate("/usergroups"));
        //Change to be a backend edit button
        console.log(formData);
    };

    return (
        <>
            <Container maxWidth="sm">
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
        </>
    )
}

export default EditGroup