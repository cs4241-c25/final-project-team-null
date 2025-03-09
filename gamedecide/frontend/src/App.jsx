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
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import {Login} from "@mui/icons-material";

function App() {


  const location = useLocation();

  return (
      <>
          {location.pathname !== "/" &&  <RedirectButtonComponent link="/home" text="home"/>}
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/userprofiles" element={<UserProfiles/>}/>
              <Route path="/createprofile" element={<CreateProfile/>}/>
              <Route path="/editprofile" element={<EditProfile/>}/>
              <Route path="/gamesearch" element={<GameSearch/>}/>
              <Route path="/createboardgame" element={<CreateBoardGame/>}/>
              <Route path="/editgame" element={<EditGame/>}/>
              <Route path="/generate" element={<Generate/>}/>
          </Routes>
      </>
  )
}

export default App
