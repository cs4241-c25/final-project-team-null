import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import {Box, Container} from "@mui/material";
import FormTextFieldComponent from "./components/FormTextFieldComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import {useNavigate} from "react-router-dom";

function SignIn({setuser}) {

    const [errortext, setErrorText] = useState("");
    const navigate = useNavigate();

  function SignUp(){
        const UsernameInput = document.getElementById("username");
        const PasswordInput = document.getElementById("password");
        const user = {username: UsernameInput.value, password: PasswordInput.value};
      axios.post("/signup/", JSON.stringify(user))
          .then(res => {
              if(res.data === "ok" || res.data === "okay"){
                  setuser(user.username);
                  navigate("/home");
              }
              else{
                  setErrorText(res.data);
              }
          })
          .catch(err => console.log(err));
  }

  function LogIn(){
      const UsernameInput = document.getElementById("username");
      const PasswordInput = document.getElementById("password");
      const user = {username: UsernameInput.value, password: PasswordInput.value};
      axios.post("/login/", JSON.stringify(user))
          .then(res => {
              if(res.data === "ok" || res.data === "okay"){
                  setuser(user.username)
                  navigate("/home");
              }
              else{
                  setErrorText(res.data);
              }
          })
          .catch(err => console.log(err));
  }

  return (
      <div className="w-full h-full flex flex-col">
          <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
              <Box sx={{ mt: 4 }} className="w-full h-full flex flex-col items-center gap-4">
                    <H1Component text={"SIGN IN"} color={"black"}/>
                    <FormTextFieldComponent id="username" label="username"></FormTextFieldComponent>
                    <FormTextFieldComponent id="password" label="password"></FormTextFieldComponent>
                    <Box className="w-full flex flex-row align-center justify-between gap-2">
                        <ActionButtonComponent text="Log in" action={LogIn}/>
                        <a href={"https://localhost:3000/auth/github"}>Login with Github</a>
                        <ActionButtonComponent text="Sign up" action={SignUp}/>
                    </Box>
                  <PComponent text={errortext} color="error"/>
              </Box>
          </Container>
      </div>
  )
}

export default SignIn
