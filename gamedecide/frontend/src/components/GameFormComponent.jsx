import React from "react";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import {Box, FormControl, FormLabel, TextField} from "@mui/material";
import RadioGroupComponent from "./RadioGroupComponent.jsx";
import CheckBoxComponent from "./CheckBoxComponent.jsx";
import SubmitButtonComponent from "./ButtonComponents/SubmitButtonComponent.jsx";
import FormNumberFieldComponent from "./FormNumberFieldComponent.jsx";

function GameFormComponent({formData, functions}) {

    return (
        <>
            <Box className="p-6 rounded-md" bgcolor="cardBG.main">
                <form onSubmit={functions.handleSubmit}
                      className="flex flex-col justify-start items-center gap-4 w-full p-8 rounded-md">
                    <FormTextFieldComponent
                        label="Game Name"
                        name="name"
                        type={"text"}
                        value={formData.name}
                        onChange={functions.handleChange}
                    />
                    <Box className="w-full flex flex-row align-center justify-between gap-2">
                        <FormNumberFieldComponent
                            id="gameMinPlayers"
                            label="Min Players"
                            name="minplayers"
                            value={formData.minplayers}
                            onChange={functions.handleChange}
                            className="w-1/3 h-full"
                        />
                        <FormNumberFieldComponent
                            id="gameMaxPlayers"
                            label="Max Players"
                            name="maxplayers"
                            value={formData.maxplayers}
                            onChange={functions.handleChange}
                            className="w-1/3 h-full"
                        />
                        <CheckBoxComponent id="unlimitedMax" label="unlimited players" value={formData.unlimitedMax}/>
                    </Box>
                    <FormControl component="fieldset" margin="normal">
                    </FormControl>
                    <SubmitButtonComponent/>
                </form>
            </Box>
        </>
    )

}

export default GameFormComponent