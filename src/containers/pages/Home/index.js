import React, { useEffect } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { getAllPostsFromAPI } from '../../../config/redux/action';
import { Container, Flex, HStack, Link, VStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import { useNavigate } from 'react-router-dom';
import Comment from '../../../components/molecules/CommentButton';

const Home = (props) => {
  const { posts = [] } = props;
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
      <Flex minW='400px' alignContent='center' align='center' p={8}>
        <VStack w='100%' >
          <div className="card-content">
            <p className="title">All Posts:</p>
          </div>
          {posts.length > 0 ? (
            <VStack alignSelf='center'>
              {posts.map((post) => (
                <HStack key={post.id} w="100%" alignItems="flex-start" >
                  <VoteButtons post={post} />
                  <Flex direction="column" >
                    <Flex onClick={() => toDetail(post)}>
                      <Post post={post} key={post.id} />
                    </Flex>
                    <Comment post={post}/>
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
  posts: state.posts,
});

const reduxDispatch = (dispatch) => ({
  getAllPosts: () => dispatch(getAllPostsFromAPI()),
});

export default connect(reduxState, reduxDispatch)(Home);
