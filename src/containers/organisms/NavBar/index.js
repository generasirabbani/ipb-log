import React from "react";
import "./Header.scss"
import { Box, HStack, Heading, Spacer, Button, useToast } from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const handleSignOut = async () => {
    const res = await props.logoutUser().catch((err) => err);
    if (res) {
      localStorage.setItem('userData', null);
      console.log("Sign Out Success!")
      toast({
        title: "Sign Out Success!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      navigate('/home');
    } else {
      console.log('Sign Out Failed!');
    }
  };
  const toLogin = () => {
    navigate('/login');
  }
  const toHome = () => {
    navigate('/home');
  }
    return(
        <Box>
            <HStack w="100%" h="80px" bg="gray.200">
                <Heading ml='50px' onClick={toHome}>IPBLog</Heading>
                <Spacer />
                {userData === null ? <Button onClick={toLogin} type="submit" variant="solid" 
                  colorScheme="blue" right="20px" size="lg" >Log In</Button> :
                  (<Button onClick={handleSignOut} type="submit" variant="solid" 
                  colorScheme="red" right="20px" size="lg" >Sign Out</Button>)}
            </HStack>
        </Box>
    )
};

const reduxState = (state) => ({
    userData: state.user,
    isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
    logoutUser: () => dispatch(logoutUserAPI()),
});

export default connect(reduxState, reduxDispatch)(NavBar);