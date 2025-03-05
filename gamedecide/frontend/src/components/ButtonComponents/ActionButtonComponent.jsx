import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function ActionButtonComponent({text, action, disabled, importance}) {

    return (
        <>
            <Button className="text-nowrap" size="large" variant="contained" color={importance === "primary" ? "primary" : "secondary"} disabled={!!disabled} onClick={action}>{text}</Button>
        </>
    )

}

export default ActionButtonComponent