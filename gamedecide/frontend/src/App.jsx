import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import axios from "axios";
import Test from "./Test.jsx";
import Home from "./Home.jsx";
import UserProfiles from "./UserProfiles.jsx";
import CreateProfile from "./CreateProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import CreateBoardGame from "./CreateBoardgame.jsx";
import EditGame from "./EditGame.jsx";
import Generate from "./Generate.jsx";
import GameSearch from "./GameSearch.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";

function App() {

  const [username, setUsername] = useState("guest");
  //const [isAuthed, setIsAuthed] = useState(false);

  const [isAuthed, setIsAuthed] = useState(true);


  return (
      <>
          <Router>
              <RedirectButtonComponent link="/" text="home"></RedirectButtonComponent>
              <Routes>
                  <Route path="/" element={isAuthed ? <Home user={username}/> : <Home user={username}/>}/>
                  <Route path="/userprofiles" element={isAuthed ? <UserProfiles user={username}/> : <Navigate to="/" />}/>
                  <Route path="/createprofile" element={ isAuthed ? <CreateProfile user={username} /> : <Navigate to="/" />}/>
                  <Route path="/editprofile" element={ isAuthed ? <EditProfile user={username}/> : <Navigate to="/" />}/>
                  <Route path="/gamesearch" element={ isAuthed ? <GameSearch user={username}/> : <Navigate to="/" />}/>
                  <Route path="/createboardgame" element={isAuthed ? <CreateBoardGame user={username}/> : <Navigate to="/" />}/>
                  <Route path="/editgame" element={isAuthed ? <EditGame user={username}/> : <Navigate to="/" />}/>
                  <Route path="/generate" element={isAuthed ? <Generate user={username}/> : <Navigate to="/" />}/>

              </Routes>
          </Router>
      </>
  )
}

export default App
