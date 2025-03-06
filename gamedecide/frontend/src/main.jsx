import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "@mui/material";
import theme from "./theme.js";
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from 'react-router-dom';

let isAuthed = false;
let username = "guest";
console.log("setting default variables");
if(localStorage.getItem("isAuthed")==="true"){
    isAuthed = true;
}

username=localStorage.getItem("username");

function setAuthed(value){
    isAuthed = value;
    if(isAuthed){
        localStorage.setItem("isAuthed","true");
    }
    else{
        localStorage.setItem("isAuthed","false");
    }
}
function getAuthed(){
    return isAuthed;
}
function setUsername(value){
    username=value;
    localStorage.setItem("username",username);
}
function getUsername(){
    return username;
}

createRoot(document.getElementById('app-root')).render(
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <App setAuthed={setAuthed} getAuthed={getAuthed} setUsername={setUsername} getUsername={getUsername}/>
          </Router>
      </ThemeProvider>
)
