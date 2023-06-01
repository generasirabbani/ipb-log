import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { Button, Flex, FormControl, FormLabel, HStack, Input, Spacer, Textarea, VStack, useToast,
AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, IconButton } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textButton, setTextButton] = useState('SIMPAN');
  const [postId, setPostId] = useState('');
  const [image, setImage] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const cancelRef = useRef();
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
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      userId: userData.uid,
      voteCount: 0,
      image: image || null,
      commentCount: 0
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
      setImage('');
      const inputImage = document.querySelector('.input-image');
      if(inputImage) {
        inputImage.value = '';
      }
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
    } else if (type === 'image') {
      const file = e.target.files[0];
      setImage(file);
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
    setImage('');
    const inputImage = document.querySelector('.input-image');
    if(inputImage) {
      inputImage.value = '';
    }
  };

  const showConfirmationDialog = (e, post) => {
    e.stopPropagation();
    setSelectedPost(post);
    setIsConfirmationOpen(true);
  };

  const confirmDeletePost = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      userId: userData.uid,
      postId: selectedPost.id,
    };
    props.deletePost(data);
    toast({
      title: "Post berhasil dihapus!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 3000
    });
    setIsConfirmationOpen(false);
  };

  const cancelDeletePost = () => {
    setSelectedPost(null);
    setIsConfirmationOpen(false);
  };

  const toDetail = (post) => {
    navigate('/detail/' + post.userId + '/' + post.id)
  }

  return (
    <>
      <NavBar />
      <Flex w='100%' minH='570px' paddingTop='40px'>
          <VStack ml='100px' w='40%'>
            <FormControl mb='10px'>
              <FormLabel fontSize='30px'>{textButton === 'UPDATE' ? 'Update Post' : 'Tambahkan Post Baru'}</FormLabel>
              <Input placeholder="title" className="input-title" value={title} border='1px'
              onChange={(e) => onInputChange(e, 'title')} />
              <Textarea
                mt="5px"
                mb="5px"
                placeholder="content"
                className="input-content"
                minH="300px"
                value={content}
                border="1px"
                onChange={(e) => onInputChange(e, 'content')}
              ></Textarea>
              <Input
                type="file"
                className="input-image"
                accept="image/*"
                onChange={(e) => onInputChange(e, 'image')}
              />
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
                <Flex key={post.id} onClick={() => updatePost(post)} >
                  <Post post={post} key={post.id} />
                  <IconButton
                    aria-label="Delete Post"
                    icon={< RxCross1 />}
                    onClick={(e) => showConfirmationDialog(e, post)}
                    colorScheme='red'
                  />
                </Flex>
              ))}
            </VStack>
          ) : null}

          
          {/* Confirmation Dialog */}
          <AlertDialog isOpen={isConfirmationOpen} leastDestructiveRef={cancelRef}>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelDeletePost}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
