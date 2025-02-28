import React, { useState } from 'react';

import {
  Container,
  Box,
} from '@mui/material';
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import GameFormComponent from "./components/GameFormComponent.jsx";

function CreateBoardGame({user}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    year: null,
    platform: '',
    ownership: 'single',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    fetch('/backend/submitgame', {
      method: "POST",
      body
    })
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <H1Component text={"Create a Game"}/>
        <GameFormComponent formData={formData} functions={{handleChange: handleChange, handleSubmit: handleSubmit}} />
      </Box>
    </Container>
  )
}

export default CreateBoardGame;
