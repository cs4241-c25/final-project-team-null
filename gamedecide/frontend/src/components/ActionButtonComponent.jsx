import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function ActionButtonComponent({text, action}) {

    return (
        <>
            <Button variant="contained" onClick={action}>{text}</Button>
        </>
    )

}

export default ActionButtonComponent