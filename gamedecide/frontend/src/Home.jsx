import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import RedirectButtonComponent from "./components/ButtonComponents/RedirectButtonComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import {Box, Container} from "@mui/material";
import H2Component from "./components/TypographyComponents/H2Component.jsx";
import hero from "./assets/hero.jpg"
import HeroTextComponent from "./components/TypographyComponents/HeroTextComponent.jsx";
import {useNavigate} from "react-router-dom";

function Home({user, setuser, auth}) {

  const [username, setUsername] = useState("guest");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    /*useEffect(()=> {
        axios.post("/currentuser")
            .then(res => {
                setuser(res.data);
                setUsername(res.data);
                setLoading(false);
                auth(true);
            })
            .catch((err)=>{
                auth(false);
                setLoading(false);});
    }, [])*/

    const GetUsername = async function(){
        const response = await fetch( "/currentuser", {
            method:'POST'
        })

        const text = await response.text()
        setuser(text);
        setUsername(text);
        setLoading(false);
        auth(true);


        console.log(username)
    }

    GetUsername();

  function LogOut(){
      axios.post("/logout/")
          .then(res => {
                  navigate("/");
          })
          .catch(err => console.log(err));
  }

  if(loading){
      return <div>Loading...</div>;
  }

  return (
      <div className="w-full h-full flex flex-col">
          <Box className="w-full flex flex-col gap-2 justify-center items-center self-start" sx={{
              height: "60vh",
              backgroundImage: `url(${hero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
          }}>
              <HeroTextComponent h1Text={"GAME DECIDE"} h2Text={"Game more, decide less!"} color={"white"}/>
          </Box>
          <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
              <Box sx={{ mt: 4 }} className="w-full h-full flex flex-col gap-4">
                  <RedirectButtonComponent link="/userprofiles" text="profiles"/>
                  <RedirectButtonComponent link="/usergroups" text="groups"/>
                  <RedirectButtonComponent link="/gamesearch" text="games"/>
                  <RedirectButtonComponent link="/generate" text="generate game"/>
                  <ActionButtonComponent text="Log out" importance={"error"} action={LogOut}/>
              </Box>
          </Container>
      </div>
  )
}

export default Home
