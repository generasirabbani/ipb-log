import React, { useState } from "react";
import {
  Heading,
  Button,
  useToast,
  Flex,
  Container,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import RightContent from "../RightContent/RightContent";

const NavBar = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const toHome = () => {
    navigate('/home');
  };

  return (
    <Flex bg="gray.200" h="80px" padding="6px 12px">
      <Flex align="center" >
        <Heading ml='30px' 
        userSelect='none'
        onClick={toHome}
        fontFamily= 'Poppins'
        fontStyle= "normal"
        fontWeight= '700'
        fontSize= '30px'
        lineHeight= '60px'
        color= '#263C92'
        _hover={{
          cursor: 'pointer'
        }}
        >IPBLog</Heading>
      </Flex>
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  refreshPosts: () => dispatch(refreshPostState()),
});

export default connect(null, reduxDispatch)(NavBar);
