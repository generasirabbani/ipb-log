import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { Button, Flex, FormControl, FormLabel, HStack, Input, Spacer, Textarea, VStack, useToast,
AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, IconButton, Icon, Text, Heading, Divider, Box } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';
import PostIcons from '../../../components/molecules/PostIcons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/id'

const Dashboard = (props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const { posts } = props;
  const [userData, setUserData] = useState({});
 
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserData(userData);
    console.log("userData : " + JSON.stringify(userData));
    props.getPosts(userData.uid);
  }, []);

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
    navigate('/post/' + post.userId + '/' + post.id)
  }

  return (
    <>
      <NavBar />
      <Flex p={8} paddingTop={94}>
        <Box
          userSelect='none'
          bg="white"
          py={4}
          px={8}
          w='25%'
          rounded="md"
          mb={8}
          pos='fixed'
          border='1px solid rgba(0, 0, 0, 0.5)'
          zIndex='500'
        >
          <Heading as="h2" size="lg" color="#263C92">
            Halaman User{"\n"}{userData.username}
          </Heading>
          <Divider my={2} borderColor="black" />
          <Text color="#263C92">
            {userData.email}
          </Text>
          <Divider my={2} borderColor="black" />
          <Text color="#263C92">
            Terakhir Login : {moment(new Date(userData.lastLogin)).locale("id").format('dddd, DD MMMM YYYY')}
          </Text>
        </Box>
          {posts.length > 0 ? (
            <VStack w="100%">
              {posts.map((post) => (
                <Flex
                  key={post.id}
                  onClick={() => toDetail(post)}
                  direction='column'
                >
                <Post
                  post={post}
                  key={post.id}
                  _hover={{
                    cursor: "pointer",
                    background: "rgba(0, 0, 0, 0.1)",
                  }}
                />
                <PostIcons
                  post={post}
                  toDetail={toDetail}
                  showConfirmationDialog={showConfirmationDialog}
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
    posts: state.userPosts,
});

const reduxDispatch = (dispatch) => ({
    savePosts: (data) => dispatch(addDataToAPI(data)),
    getPosts: (data) => dispatch(getDataFromAPI(data)),
    updatePosts: (data) => dispatch(updateDataAPI(data)),
    deletePost: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
