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
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import SignIn from "./SignIn.jsx";
import {Login} from "@mui/icons-material";

function App({setAuthed, getAuthed, setUsername, getUsername}) {

    let username = getUsername();
    let isAuthed = getAuthed();

  const location = useLocation();

  function HandleNewUsername(name){
      console.log("got username");
      setUsername(username);
      username=name;
      console.log(getUsername());
  }

  function handleAuth(authed){
      console.log("authing");
      setAuthed(authed);
      isAuthed = authed;
      console.log(getAuthed());
  }

  function printValues(){
      console.log(username);
      console.log(isAuthed);
  }


  return (
      <>
          {location.pathname !== "/" && <RedirectButtonComponent link="/home" text="home"/>}
          <ActionButtonComponent text="SeeUsername&Auth" action={printValues}/>
          <Routes>
              <Route path="/" element={<SignIn/>} />
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
