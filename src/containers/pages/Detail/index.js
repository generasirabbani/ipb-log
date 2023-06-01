import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsByIdFromAPI } from '../../../config/redux/action';
import { Box, Container, Heading, Text, HStack, Flex } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import CommentButton from '../../../components/molecules/CommentButton';

const Detail = (props) => {
  const { userId, postId } = useParams();
  const { post = {} } = props;

  useEffect(() => {
    props.getSinglePost(userId, postId);
    // console.log("post single : " + JSON.stringify(post));
  }, );

  return (
    <>
      <NavBar />
      <Container minW="900px" centerContent p={8}>
        <Box className="card-content" bg="blue.500" py={4} px={8} rounded="md" mb={8}>
          <Heading as="h2" size="lg" color="white">
            Detail Page
          </Heading>
          <Text color="white">
            Posted by: {post.data.creatorName} | Post ID: {postId}
          </Text>
        </Box>
        {post.data ? (
        <HStack key={post.id} w="100%" alignItems="flex-start" ml='350px'>
          <VoteButtons post={post} />
          <Flex direction="column" >
            <Flex>
              <Post post={post} key={post.id} />
            </Flex>
            <CommentButton post={post} />
          </Flex>
        </HStack>
        ) : (
          <Text>Loading...</Text>
        )}
      </Container>
    </>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  post: state.post,
});

const reduxDispatch = (dispatch) => ({
  getSinglePost: (userId, postId) => dispatch(getPostsByIdFromAPI(userId, postId)),
});

export default connect(reduxState, reduxDispatch)(Detail);
