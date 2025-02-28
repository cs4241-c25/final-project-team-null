import React from "react";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import {FormControl, FormLabel, TextField} from "@mui/material";
import RadioGroupComponent from "./RadioGroupComponent.jsx";
import SubmitButtonComponent from "./ButtonComponents/SubmitButtonComponent.jsx";

function GameFormComponent({formData, functions}) {

    return (
        <>
            <form onSubmit={functions.handleSubmit}>
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
                <FormTextFieldComponent
                    label="Year"
                    name="year"
                    type={"number"}
                    value={formData.year}
                    onChange={functions.handleChange}
                />
                <FormTextFieldComponent
                    label="Platform (physical, digital, etc.)"
                    name="platform"
                    type={"text"}
                    value={formData.platform}
                    onChange={functions.handleChange}
                />
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">
                        Ownership Requirement
                    </FormLabel>
                    <RadioGroupComponent id="platformSelect" name={"ownership"} value={formData.ownership}
                                         onChange={functions.handleChange} buttons={["Only One Person", "Multiple People"]}/>
                </FormControl>
                <SubmitButtonComponent/>
            </form>
        </>
    )

}

export default GameFormComponent