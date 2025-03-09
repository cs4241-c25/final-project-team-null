import Button from "@mui/material/Button";

function RedirectButtonComponent({link, text}) {

    return (
        <>
            <Button variant="contained" color="primary" href={link}>{text}</Button>
        </>
    )

}

export default RedirectButtonComponent