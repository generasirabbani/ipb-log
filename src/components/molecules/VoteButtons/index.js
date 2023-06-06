import { Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbArrowBigUpFilled, TbArrowBigUp, TbArrowBigDown, TbArrowBigDownFilled } from "react-icons/tb";
import { updateVoteAPI, unvoteAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ({ post, updateVote, userDataGlobal }) => {
  const [isVoting, setVoting] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleClick = async (type) => {
    setVoting(true);
    const voteCount = post.data.voteCount || 0;
    const votedUsers = post.data.votedUsers || {};
    const userId = userData?.uid;
    console.log("userId:" + userId);
  
    if (type === "upvote") {
      if (votedUsers[userId] && votedUsers[userId].voted && votedUsers[userId].voteType === "upvote") {
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
      if (votedUsers[userId] && votedUsers[userId].voted) {
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
    const votedUsers = post.data.votedUsers || {};
    const userId = userData?.uid;
    const voteType = votedUsers[userId] ? votedUsers[userId].voteType : null;
  
    if (voteType === "upvote") {
      return "upvote";
    } else if (voteType === "downvote") {
      return "downvote";
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
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  updateVote: (data) => dispatch(updateVoteAPI(data)),
});

export default connect(reduxState, reduxDispatch)(VoteButtons);