import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { updateVoteAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

const VoteButtons = ( { post , updateVote } ) => {
  const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];

    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedPosts(previousVotes);
  }, []);

  const handleDisablingOfVoting = (postId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724
    // on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    setVoting(true);
    // Do calculation to save the vote.
    let voteCount = post.data.voteCount;

    const date = new Date();

    if (type === "upvote") {
      voteCount = voteCount + 1;
    } else {
      voteCount = voteCount - 1;
    }
    
    const data = {
      userId: post.userId,
      postId: post.id,
      voteCount,
    }

    updateVote(data);
    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(post.id);

    setVoting(true);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <VStack>
      <VStack boxShadow='4px 3px 9px rgba(0, 0, 0, 0.1)'>
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
      <VStack boxShadow='4px 3px 9px rgba(0, 0, 0, 0.1)'>
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
      <Text bg="gray.100" rounded="md" w="100%">
        {post.voteCount}
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