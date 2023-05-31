import React, { useState } from "react";
import {
  Button,
  useToast,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

const AuthButtons = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSignOut = async () => {
    const res = await props.logoutUser().catch((err) => err);
    if (res) {
      localStorage.setItem('userData', null);
      console.log("Log Out Success!")
      toast({
        title: "Log Out Success!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      navigate('/home');
    } else {
      console.log('Log Out Failed!');
    }
  };

  const toDashboard = () => {
    navigate('/dashboard');
  };

  const toLogin = () => {
    navigate('/login');
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <>
        {userData === null ? (
            <>
            <Button onClick={toLogin} colorScheme="blue"
              type="submit" mr={2} size="lg">Log In</Button>
            <Button onClick={toRegister} colorScheme="blue"
              type="submit" variant='outline' size="lg">Sign Up</Button>
            </>
        ) : (
          <>
            <Button onClick={toDashboard} colorScheme="teal"
              type="submit" mr={2} size="lg" >Dashboard</Button>
            <Button onClick={handleSignOut} colorScheme="red"
              type="submit" size="lg" >Log Out</Button>
          </>
        )}
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
