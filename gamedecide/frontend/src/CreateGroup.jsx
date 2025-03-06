import React, {useEffect, useState} from "react";
import axios from "axios";
import {Autocomplete, Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import FormTextFieldComponent from "./components/FormTextFieldComponent.jsx";
import SubmitButtonComponent from "./components/ButtonComponents/SubmitButtonComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import ActionSelectorComponent2 from "./components/ActionSelectorComponent2.jsx";
import {useNavigate} from "react-router-dom";

function CreateGroup({ user }) {

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
        setGroupMembers(groupMembers.filter(member => !(member.username === username && member.name === profileName)));
    }

    function handleSubmit(event) {
        event.preventDefault()
        let newGroup = {username: user, name: formData.name, profiles: groupMembers};
        console.log("New group:", newGroup);

        axios.post("/submitgroup", JSON.stringify(newGroup))
            .then(res => {
                console.log("res: ", res.data);
                navigate("/usergroups");
            })
            .catch(err => console.log(err));
    }

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <form className="flex flex-col justify-start items-center gap-4 w-full" onSubmit={handleSubmit}>
                <H1Component text={"Create New Group"}/>

                <Box className="flex flex-col gap-4 w-full m-4 p-8 rounded-md items-center" bgcolor="cardBG.main">
                    <FormTextFieldComponent
                        label="Group Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </Box>

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
                                key={member.username}
                                user={member.username}
                                profile={member.name}
                                functions={{handleDelete}}
                            />
                        ))}
                    </Box>
                </Box>

                <SubmitButtonComponent/>
            </form>
        </Container>
    );
}

export default CreateGroup;
