import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPostsFromAPI } from '../../../config/redux/action';
import { Box, Flex, HStack, IconButton, VStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import { useNavigate } from 'react-router-dom';
import CreatePostLink from '../../organisms/CreatePostLink';
import PostIcons from '../../../components/molecules/PostIcons';

const Home = (props) => {
  const { posts = [] } = props;
  const navigate = useNavigate();

  useEffect(() => {
    props.getAllPosts(); // Fetch all posts
  }, []);

  const toDetail = (post) => {
    navigate('/post/' + post.userId + '/' + post.id)
  }

  return (
    <>
      <NavBar />
      <Flex p={8} paddingTop={62}>
        <Box
          userSelect='none'
          bg="none"
          w='30%'
        ></Box>
        <Flex direction='column'>
          <CreatePostLink />
          {posts.length > 0 ? (
            <Flex direction='column'>
              {posts.map((post) => (
                <HStack key={post.id} alignItems="flex-start" >
                  <VoteButtons post={post} />
                  <Flex direction="column" >
                    <Flex onClick={() => toDetail(post)} >
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
                    {/* <IconButton
                      isDisabled={userData === null || props.userData === null}
                      aria-label="Comment here"
                      icon={<AiOutlineComment />}
                      onClick={() => toDetail(post)}
                    /> */}
                    <PostIcons
                      post={post}
                      toDetail={toDetail}
                      isDashboard={false}
                    />
                  </Flex>
                </HStack>
              ))}
            </Flex>
          ) : (
            <p>No posts available.</p>
          )}
        </Flex>
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
