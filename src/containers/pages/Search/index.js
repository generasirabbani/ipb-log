import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { searchPostsFromAPI } from '../../../config/redux/action';
import { Container, VStack, HStack } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import VoteButtons from '../../../components/molecules/VoteButtons';
import { Post } from '../../../components/molecules/Post';

const Search = (props) => {
  const { query } = useParams();
  const { posts = [] } = props;

    useEffect(() => {
        props.getPostsByQuery(query);
    }, []);

    return (
      <>
      <NavBar />
      <Container maxW="900px" centerContent p={8}>
        <div className="card-content">
          <p className="title">All Posts:</p>
        </div>
        {posts.length > 0 ? (
          <VStack w="100%">
            {posts.map((post) => (
              <HStack key={post.id}  w="100%" alignItems="flex-start" >
                <VoteButtons post={post} />
                <Post post={post} key={post.id} onClick={() => toDetail(post)}/>
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
    getPostsByQuery: (query) => dispatch(searchPostsFromAPI(query)),
  });
  
export default connect(reduxState, reduxDispatch)(Search);
  