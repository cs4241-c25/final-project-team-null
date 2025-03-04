import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import ProfileComponent from "./components/ProfileComponent.jsx";
import H2Component from "./components/TypographyComponents/H2Component.jsx";

function Home({user}) {

  const [username, setUsername] = useState("guest");

  return (
      <>
          <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
              <Box className="w-full flex flex-col gap-2">
                  <H1Component text={"GAME DECIDE"}/>
                  <H2Component text={"Game more, decide less!"}/>
              </Box>
              <Box sx={{ mt: 4 }} className="w-full flex flex-col gap-4">
                  <RedirectButtonComponent link="/userprofiles" text="profiles"></RedirectButtonComponent>
                  <RedirectButtonComponent link="/gamesearch" text="games"></RedirectButtonComponent>
                  <RedirectButtonComponent link="/generate" text="generate game"></RedirectButtonComponent>
              </Box>
          </Container>
      </>
  )
}

export default Home
