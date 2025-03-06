import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom';
import Home from "./Home.jsx";
import UserProfiles from "./UserProfiles.jsx";
import CreateProfile from "./CreateProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import CreateBoardGame from "./CreateBoardgame.jsx";
import EditGame from "./EditGame.jsx";
import Generate from "./Generate.jsx";
import GameSearch from "./GameSearch.jsx";
import CreateGroup from "./CreateGroup.jsx";
import UserGroups from "./UserGroups.jsx";
import EditGroup from "./EditGroup.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import SignIn from "./SignIn.jsx";

function App() {


  const [username, setUsername] = useState("guest");
  const [isAuthed, setIsAuthed] = useState(false);

  //const [isAuthed, setIsAuthed] = useState(true);

  const location = useLocation();

  function HandleNewUsername(username){
      setUsername(username);
  }

  function handleAuth(authed){
      setIsAuthed(!!authed);
  }


  return (
      <>
          {location.pathname !== "/" && <RedirectButtonComponent link="/home" text="home"/>}
          <Routes>
              <Route path="/" element={<SignIn setuser={HandleNewUsername}/>} />
              <Route path="/home" element={<Home user={username} setuser={HandleNewUsername} auth={handleAuth}/>}/>
              <Route path="/userprofiles" element={isAuthed ? <UserProfiles user={username}/> : <Navigate to="/" />}/>
              <Route path="/createprofile" element={ isAuthed ? <CreateProfile user={username} /> : <Navigate to="/" />}/>
              <Route path="/editprofile" element={ isAuthed ? <EditProfile user={username}/> : <Navigate to="/" />}/>
              <Route path="/gamesearch" element={ isAuthed ? <GameSearch user={username}/> : <Navigate to="/" />}/>
              <Route path="/createboardgame" element={isAuthed ? <CreateBoardGame user={username}/> : <Navigate to="/" />}/>
              <Route path="/editgame" element={isAuthed ? <EditGame user={username}/> : <Navigate to="/" />}/>
              <Route path="/generate" element={isAuthed ? <Generate user={username}/> : <Navigate to="/" />}/>
              <Route path="/creategroup" element={isAuthed ? <CreateGroup user={username}/> : <Navigate to="/" />}/>
              <Route path="/usergroups" element={isAuthed ? <UserGroups user={username}/> : <Navigate to="/" />}/>
              <Route path="/editgroup" element={isAuthed ? <EditGroup user={username}/> : <Navigate to="/" />}/>

          </Routes>
      </>
  )
}

export default App
