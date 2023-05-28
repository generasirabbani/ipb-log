import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheck } from "react-icons/fi";
import { updateVoteAPI, unvoteAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ({ post, updateVote }) => {
  const [isVoting, setVoting] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
  }, []);

  const handleClick = async (type) => {
    setVoting(true);
    const voteCount = post.data.voteCount || 0;
    const votedUsers = post.data.votedUsers || {};
    const userId = userData.uid;
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
    const userId = userData.uid;
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
    <VStack>
      <VStack boxShadow="4px 3px 9px rgba(0, 0, 0, 0.1)">
        <IconButton
          size="lg"
          colorScheme={checkIfPostIsAlreadyVoted() === "upvote" ? "red" : "purple"}
          aria-label={checkIfPostIsAlreadyVoted() === "upvote" ? "Unvote" : "Upvote"}
          icon={checkIfPostIsAlreadyVoted() === "upvote" ? <FiCheck /> : <FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted() === "downvote"}
          borderRadius="md"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
          _disabled={{ opacity: 0.6 }}
        />
      </VStack>
      <VStack boxShadow="4px 3px 9px rgba(0, 0, 0, 0.1)" alignItems="center">
        <IconButton
          size="lg"
          colorScheme={checkIfPostIsAlreadyVoted() === "downvote" ? "red" : "yellow"}
          aria-label={checkIfPostIsAlreadyVoted() === "downvote" ? "Unvote" : "Downvote"}
          icon={checkIfPostIsAlreadyVoted() === "downvote" ? <FiCheck /> : <FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted() === "upvote"}
          borderRadius="md"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
          _disabled={{ opacity: 0.6 }}
        />
      </VStack>
      <Text
        bg="gray.100"
        rounded="md"
        w="100%"
        textAlign="center"
        fontWeight="bold"
        fontSize="sm"
        py={1}
        mt={2}
      >
        {post.data.voteCount || 0}
      </Text>
    </VStack>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  updateVote: (data) => dispatch(updateVoteAPI(data)),
});

export default connect(reduxState, reduxDispatch)(VoteButtons);
