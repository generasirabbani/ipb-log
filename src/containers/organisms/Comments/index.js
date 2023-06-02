import { addCommentAPI, getCommentsAPI, updateCommentAPI } from '../../../config/redux/action'
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import CommentItem from "./CommentItem";
import CommentInput from './CommentInput';
import { connect } from 'react-redux';

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentFetchLoading, setCommentFetchLoading] = useState(false);
  const [commentCreateLoading, setCommentCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const { post, getComments, userData, isLogin, postComments, addComment, updateComment } = props;

  const getPostComments = async () => {
    try {
      getComments(post.id, post.userId);
      setComments(postComments);
    } catch (error) {
      console.log("getPostComments error", error.message);
    }
    setCommentFetchLoading(false);
  };

  useEffect(() => {
    console.log("HERE IS SELECTED POST", post.id);

    getPostComments();
  }, []);

  return (
    <Box 
      bg="white" 
      p={2} 
      borderRadius="0px 0px 4px 4px" 
      border='1px solid rgba(0, 0, 0, 0.1)'
    >
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          comment={comment}
          setComment={setComment}
          loading={commentCreateLoading}
        //   user={user}
        //   onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {commentFetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {!!comments?.length ? (
              <>
                {comments.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    // onDeleteComment={onDeleteComment}
                    isLoading={deleteLoading === item.id}
                    // userId={user.uid}
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
        )}
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
});

export default connect(reduxState, reduxDispatch)(Comments);