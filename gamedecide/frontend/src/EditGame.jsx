import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GameFormComponent from "./components/GameFormComponent.jsx";
import {useLocation, useNavigate} from "react-router-dom";

function EditGame({user}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        year: 0,
        platform: "",
        ownership: "",
        minplayers: 0,
        maxplayers: 0
    });

    const location = useLocation();
    useEffect(() => {
        const {name, description, year, platform, ownership, minplayers, maxplayers} = location.state || {};
        const game = {
            name: name,
            description: description,
            year: year,
            platform: platform,
            ownership: ownership,
            minplayers: minplayers,
            maxplayers: maxplayers
        }
        game.oldname = name;
        game.oldyear = year;
        console.log("game: ", game)
        setFormData(game);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify(formData);
        fetch('/updategame', {
            method: "POST",
            body
        }).then(navigate("/gamesearch"));
        //Change to be a backend edit button
        console.log(formData);
    };


    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <H1Component text={"Edit a Game"}/>
                    <GameFormComponent formData={formData} functions={{handleChange: handleChange, handleSubmit: handleSubmit}} />
                </Box>
            </Container>
        </>
    )
}

export default EditGame