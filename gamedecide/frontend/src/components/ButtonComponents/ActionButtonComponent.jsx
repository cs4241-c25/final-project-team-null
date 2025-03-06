import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function ActionButtonComponent({text, action, disabled, importance}) {

    function color() {
        if(importance === "primary") {
            return "primary";
        }
        else if(importance === "error") {
            return "error";
        }
        else {
            return "secondary";
        }
    }

    return (
        <>
            <Button className="text-nowrap" size="large" variant="contained" color={color()} disabled={!!disabled} onClick={action}>{text}</Button>
        </>
    )

}

export default ActionButtonComponent