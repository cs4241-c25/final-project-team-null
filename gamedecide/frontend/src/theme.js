import {createTheme} from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
    },
    palette: {
        background: {
            //default: "#FADDAC",
            default: "#FADDAC",
        },
        primary: {
            //main: "#FAEEDC",
            main: "#FAEEDC",
        },
        secondary: {
            main: "#777da7",
        },
        error: {
            main: "#d81e5b",
        },
        cardBG: {
            main: "#E0BDA6",
        },
        itemBG: {
            main: "#C09069",
        },
        //color 1 for background
        //FADDAC

        //color 2 for card bg
        //C09069

        //color 3 for list item bg
        //E0BDA6

        //color 4 for h1 and primary buttons (redirect & submit)
        //FAEEDC

        //color 5 for navbar
        //68473A

        //color 6 for secondary buttons (action)
        //777da7

        //color 7 for warning buttons (delete)
        //d81e5b
    }
})

export default theme;