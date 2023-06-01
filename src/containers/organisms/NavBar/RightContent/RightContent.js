import React from "react";
import {
  Flex, 
  Menu,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../../config/redux/action";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

const RightContent = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <>
      <Flex justify='center' align='center'>
        {userData === null || props.userData === null ? <AuthButtons /> : <Icons /> }
        <UserMenu />
      </Flex>
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

export default connect(reduxState, reduxDispatch)(RightContent);
