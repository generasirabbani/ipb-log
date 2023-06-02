import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsByIdFromAPI } from '../../../config/redux/action';
import { Box, Container, Heading, Text, HStack, Flex } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import Comments from '../../organisms/Comments';

const Detail = (props) => {
  const [userData, setUserData] = useState();
  // const userData = props.userData || JSON.parse(localStorage.getItem("userData"));
  const { userId, postId } = useParams();
  const { post = {} } = props;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    props.getSinglePost(userId, postId);
    // console.log("post single : " + JSON.stringify(post));
    // console.log("from detail : " + JSON.stringify(userData));
    setUserData(userData);
  }, []);

  return (
    <>
      <NavBar />
      <Flex minW="900px" p={8} pt={74}>
        <Box
          userSelect='none'
          bg="white"
          py={4}
          px={8}
          w='300px'
          rounded="md"
          mb={8}
          pos='fixed'
          border='1px solid rgba(0, 0, 0, 0.5)'
        >
          <Heading as="h2" size="lg" color="#263C92">
            Detail Page
          </Heading>
          <Text color="black">
            -------------------------------------------
          </Text>
          <Text color="#263C92">
            Posted by: {post.data?.creatorName}
          </Text>
          <Text color="black">
            -------------------------------------------
          </Text>
          <Text color="#263C92">
            Posted at: {new Date(post.data?.createdAt).toString()} 
          </Text>
        </Box>
        {post.data ? (
        <HStack key={post.id} w="100%" alignItems="flex-start" ml='350px'>
          <VoteButtons post={post} />
          <Flex direction="column" >
            <Flex>
              <Post post={post} key={post.id} />
            </Flex>
            <Comments post={post} />
          </Flex>
        </HStack>
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
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
