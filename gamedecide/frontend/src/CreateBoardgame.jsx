import React, { useState } from 'react';
import {
  Container,
  Box,
} from '@mui/material';
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GameFormComponent from "./components/GameFormComponent.jsx";
import {useNavigate} from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "/backend";
//const BACKEND_URL = "/backend";

function CreateBoardGame({user}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    year: null,
    platform: '',
    minplayers: 0,
    maxplayers: 0,
    ownership: 'single',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    fetch('/submitgame', {
      method: "POST",
      body
    }).then(navigate("/gamesearch"));
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }} className="flex flex-col justify-center items-center">
        <H1Component text={"Create a Game"}/>
        <GameFormComponent formData={formData} functions={{handleChange: handleChange, handleSubmit: handleSubmit}} />
      </Box>
    </Container>
  )
}

export default CreateBoardGame;
