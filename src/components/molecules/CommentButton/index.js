import { HStack, IconButton, Input, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { addCommentAPI, updateCommentAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const Comment = ({ post, updateComment, addComment }) => {
  const [userData, setUserData] = useState({});
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const toast = useToast();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
  }, []);

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
    <HStack>
      {isCommenting ? 
      (<>
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
      </>) : 
      (<IconButton
        aria-label="Comment here"
        icon={<AiOutlineComment />}
        onClick={handleClick}
      />)}
      {/* Add a button or any other UI component to submit the comment */}
      {/* For example, here's an IconButton */}
      
    </HStack>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  addComment: (data) => dispatch(addCommentAPI(data)),
  updateComment: (data) => dispatch(updateCommentAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Comment);
