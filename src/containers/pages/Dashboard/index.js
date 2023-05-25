import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Flex, FormControl, FormLabel, HStack, Input, Spacer, Textarea, VStack, useToast } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';

const Dashboard = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textButton, setTextButton] = useState('SIMPAN');
  const [postId, setPostId] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { posts } = props;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    props.getPosts(userData.uid);
  }, []);

  const handleSavePosts = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = {
      title,
      content,
      date: new Date().getTime(),
      userId: userData.uid,
      voteCount: 0,
    };
    if (textButton === 'SIMPAN') {
      props.savePosts(data);
      toast({
        title: "Post sudah dibuat!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000
      });
      setTitle('');
      setContent('');
      setPostId('');
    } else {
      data.postId = postId;
      props.updatePosts(data);
      toast({
        title: "Post berhasil diubah!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000
      });
    }
  };

  const onInputChange = (e, type) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else if (type === 'content') {
      setContent(e.target.value);
    }
  };

  const updatePost = (post) => {
    setTitle(post.data.title);
    setContent(post.data.content);
    setTextButton('UPDATE');
    setPostId(post.id);
  };

  const cancelUpdate = () => {
    setTitle('');
    setContent('');
    setTextButton('SIMPAN');
    setPostId('');
  };

  const deletePost = (e, post) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      userId: userData.uid,
      postId: post.id,
    };
    props.deletePost(data);
  };

  return (
    <>
      <NavBar />
      <Flex w='100%' minH='570px' paddingTop='40px'>
          <VStack ml='50px' w='40%'>
            <FormControl mb='10px'>
              <FormLabel fontSize='30px'>{textButton === 'UPDATE' ? 'Update Post' : 'Tambahkan Post Baru'}</FormLabel>
              <Input placeholder="title" className="input-title" value={title} border='1px'
              onChange={(e) => onInputChange(e, 'title')} />
              <Textarea mt='20px' placeholder="content" className="input-content" minH='300px'
              value={content} border='1px' onChange={(e) => onInputChange(e, 'content')}></Textarea>
            </FormControl>
            <div className="action-wrapper">
              <HStack>
                {textButton === 'UPDATE' ? (<Button className="save-btn cancel" onClick={cancelUpdate}>Cancel</Button>) : null}
                <Spacer />
                <Button className="save-btn" onClick={handleSavePosts}>{textButton}</Button>
              </HStack>
            </div>
          </VStack>
          {posts.length > 0 ? (
            <VStack w="100%">
              {posts.map((post) => (
                <Container w='100%' className='card-content posts' key={post.id} onClick={() => updatePost(post)}>
                  <p className="title">{post.data.title}</p>
                  <p className="date">{new Date(post.data.date).toDateString()}</p>
                  <p className="content">{post.data.content}</p>
                  <div className="delete-btn" onClick={(e) => deletePost(e, post)}>X</div>
                </Container>
              ))}
            </VStack>
          ) : null}
      </Flex>
    </>
  );
};

const reduxState = (state) => ({
    userData: state.user,
    posts: state.posts,
});

const reduxDispatch = (dispatch) => ({
    savePosts: (data) => dispatch(addDataToAPI(data)),
    getPosts: (data) => dispatch(getDataFromAPI(data)),
    updatePosts: (data) => dispatch(updateDataAPI(data)),
    deletePost: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
