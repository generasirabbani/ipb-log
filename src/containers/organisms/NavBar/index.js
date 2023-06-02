import React from "react";
import {
  Heading,
  Flex,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";

const NavBar = (props) => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/home');
  };

  return (
    <Flex bg="white" h="54px" padding="6px 12px" pos='fixed' w='100%' zIndex='999'>
      <Flex align="center" >
        <Heading ml='20px' 
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
  
});

export default connect(null, reduxDispatch)(NavBar);
