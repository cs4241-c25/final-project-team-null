import React, { useState } from 'react';
import FormTextFieldComponent from './components/FormTextFieldComponent';
import SubmitButtonComponent from './components/ButtonComponents/SubmitButtonComponent';

import {
  Container,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import RadioGroupComponent from "./components/RadioGroupComponent.jsx";

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
        <form onSubmit={handleSubmit}>
          <FormTextFieldComponent
            label="Game Name"
            name="name"
            type={"text"}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormTextFieldComponent
              label="Year"
              name="year"
              type={"number"}
              value={formData.year}
              onChange={handleChange}
          />
          <FormTextFieldComponent
            label="Platform (physical, digital, etc.)"
            name="platform"
            type={"text"}
            value={formData.platform}
            onChange={handleChange}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              Ownership Requirement
            </FormLabel>
            <RadioGroupComponent id="platformSelect" name={"ownership"} value={formData.ownership}
                                 onChange={handleChange} buttons={["Only One Person", "Multiple People"]}/>
          </FormControl>
          <SubmitButtonComponent/>
        </form>
      </Box>
    </Container>
  );
}

export default CreateBoardGame;
