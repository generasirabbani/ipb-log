import React, { useState } from "react";
import {
  Heading,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { logoutUserAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";

const RightContent = (props) => {
  const toast = useToast();
  const navigate = useNavigate();

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
