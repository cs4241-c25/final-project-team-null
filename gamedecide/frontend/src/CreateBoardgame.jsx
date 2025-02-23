import React, { useState } from 'react';
import FormTextFieldComponent from './components/FormTextFieldComponent';
import SubmitButtonComponent from './components/SubmitButtonComponent';

import {
  Container,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from '@mui/material';

function CreateBoardGame({user}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: '',
    ownership: 'single',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Game
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormTextFieldComponent
            label="Game Name"
            name="name"
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
            label="Platform (tabletop, Console, ect.)"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              Ownership Requirement
            </FormLabel>
            <RadioGroup
              row
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
            >
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="Only One Person"
              />
              <FormControlLabel
                value="multiple"
                control={<Radio />}
                label="Multiple People"
              />
            </RadioGroup>
          </FormControl>
          <SubmitButtonComponent/>
        </form>
      </Box>
    </Container>
  );
}

export default CreateBoardGame;
