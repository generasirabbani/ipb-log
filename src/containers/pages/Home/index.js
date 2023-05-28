import React, { useEffect } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { getAllPostsFromAPI } from '../../../config/redux/action';
import { Container, HStack, Link, VStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import VoteButtons from '../../../components/molecules/VoteButtons';
import { useNavigate } from 'react-router-dom';

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
      <Container minW="900px" centerContent p={8}>
        <div className="card-content">
          <p className="title">All Posts:</p>
        </div>
        {posts.length > 0 ? (
          <VStack w="100%">
            {posts.map((post) => (
              <HStack key={post.id} w="100%" alignItems="flex-start" >
                <VoteButtons post={post} />
                <Container minW='800px' onClick={() => toDetail(post)}>
                  <Post post={post} key={post.id} />
                </Container>
              </HStack>
            ))}
          </VStack>
        ) : (
          <p>No posts available.</p>
        )}
      </Container>
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
