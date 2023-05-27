import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheck } from "react-icons/fi";
import { updateVoteAPI, unvoteAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ({ post, updateVote, unvote }) => {
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
  
    if (type === "upvote") {
      if (votedUsers[userId] && votedUsers[userId].voted) {
        // User has already upvoted, perform unvote
        unvote({ userId: post.userId, postId: post.id, voteCount: voteCount - 1, votedUserId: userId });
      } else {
        // User has not upvoted, perform upvote
        updateVote({ userId: post.userId, postId: post.id, voteCount: voteCount + 1, votedUserId: userId });
      }
    } else {
      if (votedUsers[userId] && votedUsers[userId].voted) {
        // User has already downvoted, perform unvote
        unvote({ userId: post.userId, postId: post.id, voteCount: voteCount + 1, votedUserId: userId });
      } else {
        // User has not downvoted, perform downvote
        updateVote({ userId: post.userId, postId: post.id, voteCount: voteCount - 1, votedUserId: userId });
      }
    }
  
    setVoting(false);
  };
  

  const checkIfPostIsAlreadyVoted = () => {
    const votedUsers = post.data.votedUsers || {};
    const userId = userData.uid;

    if (votedUsers[userId] && votedUsers[userId].voted) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <VStack>
      <VStack boxShadow="4px 3px 9px rgba(0, 0, 0, 0.1)">
        <IconButton
          size="lg"
          colorScheme={checkIfPostIsAlreadyVoted() ? "red" : "purple"}
          aria-label={checkIfPostIsAlreadyVoted() ? "Unvote" : "Upvote"}
          icon={checkIfPostIsAlreadyVoted() ? <FiCheck /> : <FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={isVoting}
        />
      </VStack>
      <VStack boxShadow="4px 3px 9px rgba(0, 0, 0, 0.1)">
        <IconButton
          size="lg"
          colorScheme={checkIfPostIsAlreadyVoted() ? "red" : "yellow"}
          aria-label={checkIfPostIsAlreadyVoted() ? "Unvote" : "Downvote"}
          icon={checkIfPostIsAlreadyVoted() ? <FiCheck /> : <FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={isVoting}
        />
      </VStack>
      <Text bg="gray.100" rounded="md" w="100%" textAlign="center">
        {post.data.voteCount || 0}
      </Text>
    </VStack>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  updateVote: (data) => dispatch(updateVoteAPI(data)),
  unvote: (data) => dispatch(unvoteAPI(data)),
});

export default connect(reduxState, reduxDispatch)(VoteButtons);
