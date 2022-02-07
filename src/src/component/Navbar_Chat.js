import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function MenuBar() {
  const signin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <h2>You Are in Navbar</h2>
      <AppBar>
        <Container>
          <Toolbar>
            <Typography>
              Chat App
            </Typography>
              <IconButton onClick={signin}> Login </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default MenuBar;
