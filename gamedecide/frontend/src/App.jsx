import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
import Test from "./Test.jsx";
import UserProfiles from "./UserProfiles.jsx";
import CreateProfile from "./CreateProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import CreateBoardGame from "./CreateBoardgame.jsx";
import Generate from "./Generate.jsx";

function App() {

  const [username, setUsername] = useState("guest");

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Test/>}/>
                  <Route path="/userprofiles" element={<UserProfiles user={username}/>}/>
                  <Route path="/createprofile" element={<CreateProfile user={username}/>}/>
                  <Route path="/editprofile" element={<EditProfile user={username}/>}/>
                  <Route path="/createboardgame" element={<CreateBoardGame user={username}/>}/>
                  <Route path="/generate" element={<Generate user={username}/>}/>

              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
