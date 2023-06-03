import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Icon,
    Flex,
    useToast,
  } from '@chakra-ui/react';
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../../config/redux/action";
import { AiOutlineMenu } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const UserMenu = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const toast = useToast();

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

  return (
    <>
        <Menu>
            <MenuButton 
              cursor='pointer' 
              padding='0px 6px'
              borderRadius={4}
              _hover={{
                outline: '1px solid',
                outlineColor: 'gray.300'
              }}
            >
            <Flex align='center'>
                <Flex align='center'>
                    { userData !== null || props.userData !== null ? (
                        <>
                            <Icon fontSize={24} mr={1} color="gray.500" as={AiOutlineMenu}/>
                        </>
                    ) : (
                        <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
                    )}
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {userData !== null || props.userData !== null ? (
                    <>
                    <MenuItem
                     fontSize='10pt'
                     fontWeight={700}
                     _hover={{bg: '#1E33F2', color: 'white'}}
                     onClick={toDashboard}
                    >
                      <Flex align='center'>
                        <Icon fontSize={20} mr={2} as={CgProfile} />
                        {userData?.username}
                      </Flex>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      fontSize='10pt'
                      fontWeight={700}
                      _hover={{bg: '#1E33F2', color: 'white'}}
                      onClick={handleSignOut}
                    >
                      <Flex align='center'>
                        <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                        Log Out
                      </Flex>
                    </MenuItem>
                    </>
                ) : (
                    <>
                    <MenuItem
                      fontSize='10pt'
                      fontWeight={700}
                      _hover={{bg: '#263C92', color: 'white'}}
                      onClick={toLogin}
                    >
                      <Flex align='center'>
                        <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                        Log In / Sign Up
                      </Flex>
                    </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
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

export default connect(reduxState, reduxDispatch)(UserMenu);
