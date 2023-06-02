import { addCommentAPI, deleteCommentAPI, getCommentsAPI, updateCommentAPI } from '../../../config/redux/action'
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import CommentItem from "./CommentItem";
import CommentInput from './CommentInput';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Comments = (props) => {
//   const userData = props.userData || JSON.parse(localStorage.getItem("userData"));
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState();
  const { post, getComments, postComments, addComment, updateComment, deleteComment } = props;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("from comments : " + JSON.stringify(userData));
    setUserData(userData);
  }, []);


  const handleAddComment = async () => {
    const commentCount = post.data.commentCount;
    const data = {
      userId: post.userId,
      postId: post.id,
      commentCount: commentCount + 1,
      commenterName: userData?.username,
      commenterId: userData?.uid,
      createdAt: new Date().getTime(),
      text: comment,
    }
    console.log("comment data before added : " + data);
    addComment(data);
    toast({
      title: 'Komen ditambahkan',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 1000,
    });
    setComment('');
  }

  const onDeleteComment = (selectedComment) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const commentCount = post.data.commentCount;
    const data = {
      userId: userData.uid,
      postId: post.id,
      commentId: selectedComment.id,
      commentCount: commentCount - 1,
    };

    deleteComment(data);
    toast({
      title: "Komen berhasil dihapus!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 3000
    });
  };
  
  useEffect(() => {
    console.log("HERE IS SELECTED POST", post.id);
    getComments(post.userId, post.id);
  }, []);

  return (
    <Box 
      bg="white" 
      p={2} 
      borderRadius="0px 0px 4px 4px" 
      border='1px solid rgba(0, 0, 0, 0.1)'
      rounded='lg'
      mt={5}
    >
      <Flex
        direction="column"
        p={5}
        // mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          post={post}
          comment={comment}
          setComment={setComment}
          handleAddComment={handleAddComment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        <>
            {!!postComments.length ? (
            <>
                {postComments.map((item) => (
                <CommentItem
                    key={item.id}
                    comment={item}
                    onDeleteComment={onDeleteComment}
                    // isLoading={deleteLoading === item.id}
                    userId={userData?.uid}
                />
                ))}
            </>
            ) : (
            <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
            >
                <Text fontWeight={700} opacity={0.3}>
                No Comments Yet
                </Text>
            </Flex>
            )}
        </>
      </Stack>
    </Box>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
  postComments: state.postComments,
});

const reduxDispatch = (dispatch) => ({
  addComment: (data) => dispatch(addCommentAPI(data)),
  updateComment: (data) => dispatch(updateCommentAPI(data)),
  getComments: (userId, postId) => dispatch(getCommentsAPI(userId, postId)),
  deleteComment: (data) => dispatch(deleteCommentAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Comments);