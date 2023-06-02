import React, { useState } from "react";
import {
  Button,
  useToast,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../../config/redux/action";
import { useNavigate } from "react-router-dom";

const AuthButtons = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const toLogin = () => {
    navigate('/login');
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <>  
      <Button onClick={toLogin}
        colorScheme="blue"
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        m={1}
      >Log In</Button>
      <Button onClick={toRegister}
        colorScheme="blue"
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        m={1}
      >Sign Up</Button>
    </>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAPI()),
});

export default connect(reduxState, reduxDispatch)(AuthButtons);
