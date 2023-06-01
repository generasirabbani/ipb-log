import { Button, Flex, Icon, useToast } from '@chakra-ui/react';
import React, { Component } from 'react';
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs"
import { GrAdd } from "react-icons/gr"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5';


const Icons = (props) => {
  const navigate = useNavigate();
  const toDashboard = () => {
    navigate('/dashboard');
  }
    
  return (
    <Flex>
      <Flex 
        display={{
            base: "none",
            md: "flex",
        }}
        align='center'
        borderRight='1px solid'
        borderColor='gray.200'
      >
        {/* <Flex 
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
        >
            <Icon as={BsArrowUpRightCircle} fontSize={20}/>
        </Flex> */}
        {/* <Flex 
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
        >
            <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex> */}
        {/* <Flex 
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
        >
            <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex> */}
      </Flex>
      <>
        {/* <Flex 
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
        >
            <Icon as={BsChatDots} fontSize={20} />
        </Flex>
        <Flex 
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
        >
            <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex> */}
        <Flex 
          display={{
              base: 'none',
              md: "flex"
          }}
          mr={1.5} 
          ml={1.5} 
          padding={1} 
          cursor='pointer' 
          borderRadius={4} 
          _hover={{bg: "gray.300"}}
          onClick={toDashboard}
        >
            <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </>
    </Flex>
  )
}

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAPI()),
});

export default connect(reduxState, reduxDispatch)(Icons);