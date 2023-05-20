import React from "react";
import "./Header.scss"
import { Box, HStack, Heading, Spacer, Button, useToast } from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const res = await props.logoutUser().catch((err) => err);
    if (res) {
      localStorage.removeItem('userData');
      console.log("Sign Out Success!")
      toast({
        title: "Sign Out Success!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      navigate('/login');
    } else {
      console.log('Sign Out Failed!');
    }
  };
    return(
        <Box>
            <HStack w="100%" h="80px" bg="gray.200">
                <Heading fontFamily="Poppins" fontWeight="700" ml="50px"
                fontSize="30px" lineHeight="60px">IPBLog</Heading>
                <Spacer />
                <Button onClick={handleSignOut} type="submit" variant="solid" 
                  colorScheme="red" right="20px" size="lg" >Sign Out</Button>
            </HStack>
        </Box>
    )
};

const reduxState = (state) => ({
    userData: state.user,
});

const reduxDispatch = (dispatch) => ({
    logoutUser: () => dispatch(logoutUserAPI()),
});

export default connect(reduxState, reduxDispatch)(NavBar);