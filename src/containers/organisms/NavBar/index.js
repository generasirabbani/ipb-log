import React, { useState } from "react";
import "./Header.scss";
import {
  Box,
  HStack,
  Heading,
  Spacer,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI, searchPostsFromAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  const toDashboard = () => {
    navigate('/dashboard');
  };

  const toLogin = () => {
    navigate('/login');
  };

  const toHome = () => {
    navigate('/home');
  };

  const handleSearch = () => {
    props.searchPosts(searchQuery);
  };

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      <HStack w="100%" h="80px" bg="gray.200">
        <Heading ml='50px' onClick={toHome}>IPBLog</Heading>

        <Spacer />

        {/* Search Bar */}
        <Box position="absolute" left="50%" transform="translateX(-50%)" display="flex" alignItems="center">
          <Input
            type="text"
            border="1px"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={onSearchInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            maxW="500px"
            mr="4"
          />
          <Button onClick={handleSearch} colorScheme="blue">
            Search
          </Button>
        </Box>

        <Spacer />

        {userData === null ? (
          <Button onClick={toLogin} type="submit" variant="solid"
            colorScheme="blue" size="lg" >Log In</Button>
        ) : (
          <>
            <Button onClick={toDashboard} type="submit" variant="solid"
              colorScheme="teal" size="lg" >Dashboard</Button>
            <Button onClick={handleSignOut} type="submit" variant="solid"
              colorScheme="red" size="lg" >Sign Out</Button>
          </>
        )}

      </HStack>
    </Box>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAPI()),
  searchPosts: (query) => dispatch(searchPostsFromAPI(query)),
});

export default connect(reduxState, reduxDispatch)(NavBar);
