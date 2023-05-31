import React, { useState } from "react";
import {
  Heading,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../config/redux/action";
import AuthButtons from "./AuthButtons";

const RightContent = () => {

  return (
    <>
    {/* <AuthModal /> */}
      <Flex justify='center' align='center'>
        <AuthButtons />
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

export default connect(null, null)(RightContent);
