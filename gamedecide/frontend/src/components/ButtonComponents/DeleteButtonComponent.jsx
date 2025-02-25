import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButtonComponent({action}) {

    return (
        <>
            <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={action}>Delete</Button>
        </>
    )

}

export default DeleteButtonComponent