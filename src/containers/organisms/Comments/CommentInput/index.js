import { Button, Flex, IconButton, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import AuthButtons from "../../NavBar/RightContent/AuthButtons";
import { addCommentAPI, updateCommentAPI } from "../../../../config/redux/action";
import { connect } from "react-redux";

const CommentInput = (props) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const toast = useToast();
  const { post, comment, setComment, loading, onCreateComment, } = props;

  const handleAddComment = async () => {
    const commentCount = post.data.commentCount || 0;
    const userId = userData?.uid;
    const data = {
      userId: post.userId,
      postId: post.id,
      commentCount: commentCount + 1,
      commenterId: userId,
      comment: commentInput,
    }
    props.addComment(data);
    setIsCommenting(false);
    setCommentInput('');
  }

  return (
    <Flex direction="column" position="relative">
      {userData !== null ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {userData?.username}
            </span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
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
              height="26px"
              // disabled={!comment.length}
              isLoading={loading}
              onClick={() => onCreateComment(comment)}
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
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  addComment: (data) => dispatch(addCommentAPI(data)),
  updateComment: (data) => dispatch(updateCommentAPI(data)),
});

export default connect(reduxState, reduxDispatch)(CommentInput);
