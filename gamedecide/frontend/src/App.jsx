import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
import Test from "./Test.jsx";
import UserProfiles from "./UserProfiles.jsx";
import CreateProfile from "./CreateProfile.jsx";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Test/>}/>
                  <Route path="/2" element={<Test/>}/>
                  <Route path="/userprofiles" element={<UserProfiles user={"name"}/>}/>
                  <Route path="/createprofile" element={<CreateProfile />}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
