import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H2Component from "./components/TypographyComponents/H2Component.jsx";
import hero from "./assets/hero.jpg"
import HeroTextComponent from "./components/TypographyComponents/HeroTextComponent.jsx";

function Home({user}) {

  const [username, setUsername] = useState("guest");

  return (
      <div className="w-full h-full flex flex-col">
          <Box className="w-full flex flex-col gap-2 justify-center items-center self-start" sx={{
              height: "75vh",
              backgroundImage: `url(${hero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
          }}>
              <HeroTextComponent h1Text={"GAME DECIDE"} h2Text={"Game more, decide less!"} color={"white"}/>
          </Box>
          <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
              <Box sx={{ mt: 4 }} className="w-full h-full flex flex-col gap-4">
                  <RedirectButtonComponent link="/userprofiles" text="profiles"></RedirectButtonComponent>
                  <RedirectButtonComponent link="/gamesearch" text="games"></RedirectButtonComponent>
                  <RedirectButtonComponent link="/generate" text="generate game"></RedirectButtonComponent>
              </Box>
          </Container>
      </div>
  )
}

export default Home
