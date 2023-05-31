import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsByIdFromAPI } from '../../../config/redux/action';
import { Box, Container, Heading, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import Comment from '../../../components/molecules/CommentButton';

const Detail = (props) => {
  const { userId, postId } = useParams();
  const { post = {} } = props;

  useEffect(() => {
    props.getSinglePost(userId, postId);
  }, []);

  return (
    <>
      <NavBar />
      <Container minW="900px" centerContent p={8}>
        <Box className="card-content" bg="blue.500" py={4} px={8} rounded="md" mb={8}>
          <Heading as="h2" size="lg" color="white">
            Detail Page
          </Heading>
          <Text color="white">
            ID: {userId} | Post ID: {postId}
          </Text>
        </Box>
        {post.data ? (
        <HStack key={post.id} w="100%" alignItems="flex-start" ml='350px'>
          <VoteButtons post={post} />
          <Flex direction="column" >
            <Flex onClick={() => toDetail(post)}>
              <Post post={post} key={post.id} />
            </Flex>
            <Comment post={post} />
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
