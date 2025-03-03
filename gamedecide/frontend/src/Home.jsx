import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";

function Home({user}) {

  const [username, setUsername] = useState("guest");

  return (
      <>
            <H1Component text="GAME DECIDE"></H1Component>
      </>
  )
}

export default Home
