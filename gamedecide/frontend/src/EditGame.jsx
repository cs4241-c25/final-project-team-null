import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GameFormComponent from "./components/GameFormComponent.jsx";
import {useLocation, useNavigate} from "react-router-dom";

function EditGame({user}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        minplayers: 0,
        maxplayers: 0,
        length: "medium"
    });

    const location = useLocation();
    useEffect(() => {
        const {name, minplayers, maxplayers, length} = location.state || {};
        const game = {
            name: name,
            minplayers: minplayers,
            maxplayers: maxplayers,
            length: length
        }
        game.oldname = name;
        console.log("game: ", game)
        setFormData(game);
    }, [])

    const handleChange = (e) => {
        const { name, value} = e.target;
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
                <Box sx={{ mt: 4 }} className="flex flex-col justify-center items-center my-8">
                    <H1Component text={"Edit a Game"}/>
                    <GameFormComponent formData={formData} functions={{handleChange: handleChange, handleSubmit: handleSubmit}} />
                </Box>
            </Container>
        </>
    )
}

export default EditGame