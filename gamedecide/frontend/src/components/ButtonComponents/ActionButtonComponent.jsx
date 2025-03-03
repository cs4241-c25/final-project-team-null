import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function ActionButtonComponent({text, action, disabled}) {

    return (
        <>
            <Button className="text-nowrap" size="large" variant="contained" disabled={!!disabled} onClick={action}>{text}</Button>
        </>
    )

}

export default ActionButtonComponent