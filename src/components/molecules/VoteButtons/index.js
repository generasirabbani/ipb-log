import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { updateVoteAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ({ post, updateVote, userData }) => {
  const [isVoting, setVoting] = useState(false);

  useEffect(() => {
    // Fetch the previously voted posts from the server or Redux state if needed
    // and update the state accordingly.
    // Example: fetchVotedPosts();
  }, []);

  const handleClick = async (type) => {
    setVoting(true);
    let voteCount = post.data.voteCount || 0;

    if (type === "upvote") {
      voteCount = voteCount + 1;
    } else {
      voteCount = voteCount - 1;
    }

    const data = {
      userId: post.userId,
      postId: post.id,
      voteCount,
      votedUserId: userData.uid,
    };

    updateVote(data);

    // Update the votedPosts state or Redux state if needed.
    // Example: updateVotedPosts(post.id);

    setVoting(false);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (
      post.data.votedUsers &&
      post.data.votedUsers.includes(userData.uid)
    ) {
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
          colorScheme="purple"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()}
        />
      </VStack>
      <VStack boxShadow="4px 3px 9px rgba(0, 0, 0, 0.1)">
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()}
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
});

export default connect(reduxState, reduxDispatch)(VoteButtons);
