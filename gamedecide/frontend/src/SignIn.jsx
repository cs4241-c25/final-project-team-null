import React, {useEffect, useState} from "react";
import axios from "axios";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import {Box, Container} from "@mui/material";
import FormTextFieldComponent from "./components/FormTextFieldComponent.jsx";
import ActionButtonComponent from "./components/ButtonComponents/ActionButtonComponent.jsx";
import PComponent from "./components/TypographyComponents/PComponent.jsx";
import {useNavigate} from "react-router-dom";

function SignIn() {

  return (
      <div className="w-full h-full flex flex-col">
          <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
              <Box sx={{ mt: 4 }} className="w-full h-full flex flex-col items-center gap-4">
                    <H1Component text={"SIGN IN"} color={"black"}/>
                    <Box className="w-full flex flex-row align-center justify-between gap-2">
                        <a href={"/auth/github"}>Login with Github</a>
                    </Box>
              </Box>
          </Container>
      </div>
  )
}

export default SignIn
