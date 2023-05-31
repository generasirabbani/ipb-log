import { Flex, HStack, IconButton, Input, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { addCommentAPI, updateCommentAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const Comment = ({ post, updateComment, addComment, userDataGlobal }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const toast = useToast();

  const handleClick = () => {
    setIsCommenting(true);
  };

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
    addComment(data);
    setIsCommenting(false);
    setCommentInput('');
  }

  return (
    <Flex>
      <Input
          placeholder="Enter your comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          mb="2"
        />
        <IconButton
          aria-label="Submit your Comment"
          icon={<AiOutlineComment />}
          onClick={handleAddComment}
        />
    </Flex>
  );
};

const reduxState = (state) => ({
  userDataGlobal: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  addComment: (data) => dispatch(addCommentAPI(data)),
  updateComment: (data) => dispatch(updateCommentAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Comment);
