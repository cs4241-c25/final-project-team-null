import React from "react";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import {Box, FormControl, FormLabel, TextField} from "@mui/material";
import RadioGroupComponent from "./RadioGroupComponent.jsx";
import SubmitButtonComponent from "./ButtonComponents/SubmitButtonComponent.jsx";

function GameFormComponent({formData, functions}) {

    return (
        <>
            <form onSubmit={functions.handleSubmit} className="flex flex-col justify-start items-center gap-4 w-full">
                <FormTextFieldComponent
                    label="Game Name"
                    name="name"
                    type={"text"}
                    value={formData.name}
                    onChange={functions.handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={functions.handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Box className="w-full flex flex-row align-center justify-between gap-2">
                    <FormTextFieldComponent
                        label="Year"
                        name="year"
                        type={"number"}
                        value={formData.year}
                        onChange={functions.handleChange}
                        className="w-1/3 h-full"
                    />
                    <FormTextFieldComponent
                        label="Min Players"
                        name="minplayers"
                        type={"number"}
                        value={formData.minplayers}
                        onChange={functions.handleChange}
                        className="w-1/3 h-full"
                    />
                    <FormTextFieldComponent
                        label="Max Players"
                        name="maxplayers"
                        type={"number"}
                        value={formData.maxplayers}
                        onChange={functions.handleChange}
                        className="w-1/3 h-full"
                    />
                </Box>
                <FormControl component="fieldset" margin="normal">
                    <Box className="flex flex-col justify-start items-center gap-4 w-full">
                        <FormLabel component="legend">Platform</FormLabel>
                        <RadioGroupComponent id="platformSelect" name={"platform"} value={formData.platform}
                                             onChange={functions.handleChange} buttons={["Physical", "Digital"]}/>
                    </Box>
                </FormControl>
                    <Box className="flex flex-col justify-start items-center gap-4 w-full">
                        <FormLabel component="legend">Ownership Requirement</FormLabel>
                        <RadioGroupComponent id="ownnershipSelect" name={"ownership"} value={formData.ownership}
                                             onChange={functions.handleChange} buttons={["Only One Person", "Multiple People"]}/>
                    </Box>
                <FormControl component="fieldset" margin="normal">
                </FormControl>
                <SubmitButtonComponent/>
            </form>
        </>
    )

}

export default GameFormComponent