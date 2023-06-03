import { Button, Flex, IconButton, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthButtons from "../../NavBar/RightContent/AuthButtons";
import { addCommentAPI, updateCommentAPI } from "../../../../config/redux/action";
import { connect } from "react-redux";

const CommentInput = (props) => {
  const [userData, setUserData] = useState();
  const { comment, setComment, loading, handleAddComment } = props;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("from commentinput : " + JSON.stringify(userData));
    setUserData(userData);
  }, []);

  return (
    <Flex direction="column" position="relative" alignContent='center'>
      {userData !== null ? (
        <>
          <Text mb={1}>
            Komen sebagai{" "}
            <span style={{ color: "#3182CE" }}>
              {userData?.username}
            </span>
          </Text>
          <Input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Silahkan komen disini"
            fontSize="10pt"
            borderRadius={4}
            minHeight="90px"
            pb={8}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment();
              }
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="20px"
              disabled={!comment.length}
              isLoading={loading}
              onClick={handleAddComment}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          direction='column'
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

const reduxState = (state) => ({
  // userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  addComment: (data) => dispatch(addCommentAPI(data)),
  updateComment: (data) => dispatch(updateCommentAPI(data)),
});

export default connect(reduxState, reduxDispatch)(CommentInput);
