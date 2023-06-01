import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPostsFromAPI } from '../../../config/redux/action';
import { Flex, HStack, IconButton, VStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import CreatePostLink from '../../organisms/CreatePostLink';

const Home = (props) => {
  const { posts = [] } = props;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    props.getAllPosts(); // Fetch all posts
  }, []);

  const toDetail = (post) => {
    navigate('/detail/' + post.userId + '/' + post.id)
  }

  return (
    <>
      <NavBar />
      <Flex minW='400px' direction='column' align='center' p={8}>
        <Flex>
          <CreatePostLink />
        </Flex>
        <VStack w='100%' >
          {posts.length > 0 ? (
            <VStack alignSelf='center'>
              {posts.map((post) => (
                <HStack key={post.id} w="100%" alignItems="flex-start" >
                  <VoteButtons post={post} />
                  <Flex direction="column" >
                    <Flex onClick={() => toDetail(post)}>
                      <Post post={post} key={post.id} />
                    </Flex>
                    <IconButton
                      isDisabled={userData === null || props.userData === null}
                      aria-label="Comment here"
                      icon={<AiOutlineComment />}
                      onClick={() => toDetail(post)}
                    />
                  </Flex>
                </HStack>
              ))}
            </VStack>
          ) : (
            <p>No posts available.</p>
          )}
        </VStack>
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
