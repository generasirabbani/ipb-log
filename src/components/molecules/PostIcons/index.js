import React, { useEffect, useState } from "react";
import { Flex, Icon, Text, useClipboard, useToast } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowRedoOutline } from "react-icons/io5";

const PostIcons = ({ post, showConfirmationDialog }) => {
  const [userData, setUserData] = useState();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const navigate = useNavigate();
  const toast = useToast();
  const link = `${window.location.origin}/post/${post.userId}/${post.id}`;
  const {hasCopied, onCopy} = useClipboard(link);
  const toDetail = (post) => {
    navigate('/post/' + post.userId + '/' + post.id)
  }
  const toEdit = (e, post) => {
    e.stopPropagation();
    navigate('/post/' + post.userId + '/' + post.id + '/edit');
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserData(userData);
  }, []);

  const handleSharePost = (e, post) => {
    e.stopPropagation();
    onCopy();
    toast({
      title: 'Link sudah masuk ke Clipboard!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 1000,
    });
  };
  

  return (
    <Flex
      border="1px solid rgba(0, 0, 0, 0.1)"
      bg="white"
      rounded="lg"
      w="100%"
      my={2}
    >
      <Flex align="center" p={2} width="40px" borderRadius="3px 0px 0px 3px">
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            onClick={() => toDetail(post)}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.data.commentCount}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            onClick={(e) => handleSharePost(e, post)}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex> */}
          {userData?.uid === post?.userId && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={(e) => toEdit(e, post)}
            >
              <Icon as={AiOutlineEdit} mr={2} />
              <Text fontSize="9pt">Edit</Text>
            </Flex>
          )}
          {isDashboard && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              w={90}
              onClick={(e) => showConfirmationDialog(e, post)}
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text fontSize="9pt">Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostIcons;
