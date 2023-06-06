import { Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbArrowBigUpFilled, TbArrowBigUp, TbArrowBigDown, TbArrowBigDownFilled } from "react-icons/tb";
import { updateVoteAPI, getVotesAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ({ post, updateVote, userDataGlobal, votedPosts, getVotes }) => {
  const [isVoting, setVoting] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    getVotes(userData?.uid);
    console.log("cek voted posts : ", votedPosts);
  }, []);
  
  const handleClick = async (type) => {
    setVoting(true);
    const voteCount = post.data.voteCount || 0;
    const userId = userData?.uid;
  
    if (type === "upvote") {
      const upvotedPost = votedPosts.find((votedPost) => votedPost.postId === post.id && votedPost.data.voteType === "upvote");
  
      if (upvotedPost) {
        // User has already upvoted, perform unvote
        updateVote({
          userId: post.userId,
          postId: post.id,
          voteCount: voteCount - 1,
          votedUserId: userId,
          voteType: "unvoted",
          voted: false,
        });
      } else {
        // User has not upvoted, perform upvote
        updateVote({
          userId: post.userId,
          postId: post.id,
          voteCount: voteCount + 1,
          votedUserId: userId,
          voteType: "upvote",
          voted: true,
        });
      }
    } else {
      const downvotedPost = votedPosts.find((votedPost) => votedPost.postId === post.id && votedPost.data.voteType === "downvote");
  
      if (downvotedPost) {
        // User has already downvoted, perform unvote
        updateVote({
          userId: post.userId,
          postId: post.id,
          voteCount: voteCount + 1,
          votedUserId: userId,
          voteType: "unvoted",
          voted: false,
        });
      } else {
        // User has not downvoted, perform downvote
        updateVote({
          userId: post.userId,
          postId: post.id,
          voteCount: voteCount - 1,
          votedUserId: userId,
          voteType: "downvote",
          voted: true,
        });
      }
    }
  
    setVoting(false);
  };
  
  const checkIfPostIsAlreadyVoted = () => {
    const voteType = votedPosts.find((votedPost) => votedPost.data.voteType);
  
    if (voteType) {
      return voteType.data.voteType;
    } else {
      return null;
    }
  };
  

  return (
    <Flex direction='column' mr={2}>
      <Flex>
        <IconButton
          size='sm'
          bg='none'
          fontSize={30}
          aria-label={checkIfPostIsAlreadyVoted() === "upvote" ? "Unvote" : "Upvote"}
          icon={checkIfPostIsAlreadyVoted() === "upvote" ? <TbArrowBigUpFilled color="blue" /> : <TbArrowBigUp color="gray" />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted() === "downvote" || userData === null || userDataGlobal === null }
          borderRadius="md"
          // _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
          _disabled={{ opacity: 0.25 }}
        />
      </Flex>
      <Text
        userSelect='none'
        bg="none"
        fontSize={15}
        textAlign="center"
        fontWeight="bold"
      >
        {post.data.voteCount || 0}
      </Text>
      <Flex>
        <IconButton
          size='sm'
          bg='none'
          fontSize={30}
          aria-label={checkIfPostIsAlreadyVoted() === "downvote" ? "Unvote" : "Downvote"}
          icon={checkIfPostIsAlreadyVoted() === "downvote" ? <TbArrowBigDownFilled color="red"/> : <TbArrowBigDown color="gray" />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted() === "upvote" || userData === null || userDataGlobal === null }
          borderRadius="md"
          // _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
          _disabled={{ opacity: 0.25 }}
        />
      </Flex>
    </Flex>
  );
};

const reduxState = (state) => ({
  userDataGlobal: state.user,
  votedPosts: state.votedPosts,
});

const reduxDispatch = (dispatch) => ({
  updateVote: (data) => dispatch(updateVoteAPI(data)),
  getVotes: (data) => dispatch(getVotesAPI(data)),
});

export default connect(reduxState, reduxDispatch)(VoteButtons);
