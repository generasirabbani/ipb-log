import React, { useState } from "react";
import {
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const PostIcons = ({ post, showConfirmationDialog }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const navigate = useNavigate();
  const toDetail = (post) => {
    navigate('/detail/' + post.userId + '/' + post.id)
  }

  return (
    <Flex
      border="1px solid rgba(0, 0, 0, 0.1)"
      bg="white"
      rounded='lg'
      my={2}
    >
      <Flex
        align="center"
        p={2}
        width="40px"
        borderRadius="3px 0px 0px 3px"
      >
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
          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex> */}
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
          {isDashboard ? (
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
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostIcons;
