import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, deleteAccountAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { Button, Flex, VStack, useToast, Text, Heading, Divider, Box } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import { Post } from '../../../components/molecules/Post';
import PostIcons from '../../../components/molecules/PostIcons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/id'
import DeleteAlert from '../../../components/molecules/DeleteAlert';

const Dashboard = (props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const { posts } = props;
  const [userData, setUserData] = useState({});
 
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserData(userData);
    // console.log("userData : " + JSON.stringify(userData));
    props.getPosts(userData.uid);
  }, []);

  const showConfirmationDialog = (e, post) => {
    e.stopPropagation();
    setSelectedPost(post);
    setIsConfirmationOpen(true);
  };

  const showAlert = () => {
    setIsAlertOpen(true);
  }
  const confirmDeleteAccount = async () => {
    const res = await props.deleteAccount().catch((err) => err);
    if (res) {
      localStorage.setItem('userData', null);
      // console.log("Akun berhasil dihapus!")
      toast({
        title: "Akun berhasil dihapus!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      setIsAlertOpen(false);
      navigate('/home');
    } else {
      // console.log('Log Out Gagal!');
      toast({
        title: "Akun gagal dihapus!",
        status: "failed",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      setIsAlertOpen(false);
    }
  }
  const cancelDeleteAccount = () => {
    setIsAlertOpen(false);
  }
  
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

  return (
    <>
      <NavBar />
      <Flex p={8} paddingTop={74}>
          {posts.length > 0 ? (
            <VStack w="100%">
              {posts.map((post) => (
                <Flex
                  key={post.id}
                  direction='column'
                  w="100%"
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
                  showConfirmationDialog={showConfirmationDialog}
                />
                </Flex>
              ))}
            </VStack>
          ) : (
            <VStack w="100%">
              <Box
                border="1px solid rgba(229, 231, 235, 1)"
                padding="16px"
                bg="white"
                w="435px"
                transition="all ease 0.35s"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.04)"
                rounded="lg"
              >
                <Text fontSize="24px" fontWeight="bold">
                  Anda Belum Pernah Post
                </Text>
              </Box>
            </VStack>
          )}
          <Flex
            mb={8}
            mr='60px'
            pos='fixed'
            w='25%'
            right={0}
            zIndex='500'
            direction='column'
          >
            <Box
              userSelect='none'
              bg="white"
              py={4}
              px={8}
              rounded="md"
              border='1px solid rgba(0, 0, 0, 0.3)'
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
              <Divider my={2} borderColor="black" />
              <Text color="#263C92">
                Jumlah Post : {posts.length}
              </Text>
            </Box>
            <Flex justifyContent='center'>
            {/* <Button 
              // onClick={toLogin}
              colorScheme="blue"
              variant="solid"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              m={1}
            >Edit</Button> */}
            <Button 
              onClick={showAlert}
              colorScheme="red"
              variant="solid"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "90px", md: "130px" }}
              m={1}
            >Delete Akun</Button>
            </Flex>
          </Flex>
          <DeleteAlert 
            deletedItem={"Post"}
            isConfirmationOpen={isConfirmationOpen}
            cancelRef={cancelRef}
            cancelDelete={cancelDeletePost}
            confirmDelete={confirmDeletePost}
          />
          <DeleteAlert 
            deletedItem={"Akun"}
            isConfirmationOpen={isAlertOpen}
            cancelRef={cancelRef}
            cancelDelete={cancelDeleteAccount}
            confirmDelete={confirmDeleteAccount}
          />
          <Box userSelect='none' bg="none" w='45%'></Box>
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
    deleteAccount: () => dispatch(deleteAccountAPI()),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
