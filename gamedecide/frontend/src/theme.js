import {createTheme} from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
    },
    palette: {
        background: {
            default: "#FADDAC",
        },
        primary: {
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
        navbar: {
            main: "#68473A",
        }
    }
})

export default theme;