import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
import Test from "./Test.jsx";
import UserProfiles from "./UserProfiles.jsx";
import CreateProfile from "./CreateProfile.jsx";

function App() {

  const [username, setUsername] = useState("guest");

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Test/>}/>
                  <Route path="/userprofiles" element={<UserProfiles user={username}/>}/>
                  <Route path="/createprofile" element={<CreateProfile user={username}/>}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
