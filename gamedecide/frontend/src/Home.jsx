import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";

function Home({user}) {

  const [username, setUsername] = useState("guest");

  return (
      <>
            <H1Component text="GAME DECIDE"></H1Component>
            <RedirectButtonComponent link="/userprofiles" text="profiles"></RedirectButtonComponent>
          <br/>
          <RedirectButtonComponent link="/gamesearch" text="games"></RedirectButtonComponent>
          <br/>
          <RedirectButtonComponent link="/generate" text="generate game"></RedirectButtonComponent>
      </>
  )
}

export default Home
