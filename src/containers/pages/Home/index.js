import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPostsFromAPI } from '../../../config/redux/action';
import { Box, Flex, HStack, IconButton, VStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
// import { useNavigate } from 'react-router-dom';
import CreatePostLink from '../../organisms/CreatePostLink';
import PostIcons from '../../../components/molecules/PostIcons';

const Home = (props) => {
  const { posts = [] } = props;

  useEffect(() => {
    props.getAllPosts(); // Fetch all posts
  }, []);

  return (
    <>
      <NavBar />
      <Flex p={8} paddingTop={62}>
        <Box userSelect='none' bg="none" w='50%'></Box>
        <Flex direction='column' w='100%'>
          <CreatePostLink />
          {posts.length > 0 ? (
            <Flex direction='column' w='100%'>
              {posts.map((post) => (
                <Flex key={post.id} >
                  <VoteButtons post={post} />
                  <Flex direction="column" w='100%'>
                    <Flex w='100%' >
                      <Post
                        post={post}
                        key={post.id}
                        _hover={{
                          cursor: "pointer",
                          background: "rgba(0, 0, 0, 0.1)",
                          transform: "translateY(-2px)",
                        }}
                      />
                    </Flex>
                    <PostIcons
                      post={post}
                      isDashboard={false}
                    />
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : (
            <p>No posts available.</p>
          )}
        </Flex>
        <Box userSelect='none' bg="none" w='50%'></Box>
      </Flex>
    </>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  posts: state.homePosts,
});

const reduxDispatch = (dispatch) => ({
  getAllPosts: () => dispatch(getAllPostsFromAPI()),
});

export default connect(reduxState, reduxDispatch)(Home);
