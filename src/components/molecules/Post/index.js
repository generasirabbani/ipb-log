import { Box, Text, Image, Flex } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/id";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Post = ({ post, _hover, isDetail = false }) => {
  const maxCharCount = 100; // Maximum number of characters to show
  const navigate = useNavigate();

  const truncateContent = (content) => {
    if (!isDetail && content?.length > maxCharCount) {
      return content.slice(0, maxCharCount) + "...";
    }
    return content;
  };

  const toDetail = (post) => {
    navigate('/post/' + post.userId + '/' + post.id)
  }

  return (
      <Flex
        border="1px solid rgba(229, 231, 235, 1)"
        padding="16px"
        bg="white"
        w='100%'
        minH="150px"
        maxH="69vh"
        transition="all ease 0.35s"
        _hover={_hover}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.04)"
        rounded="lg"
        direction='column'
        onClick={() => toDetail(post)}
      >
        <Text fontSize="30px" fontWeight="bold">
          {post.data.title}
        </Text>
        <Text fontSize="15px" color="gray.500">
          Dipost oleh {post.data.creatorName}{" "}
          {moment(new Date(post.data.createdAt)).locale("id").fromNow()}
        </Text>
        {post.data.image && (
          <Flex justify="center" h="70%">
            <Image
              align="center"
              src={post.data.image}
              alt="Post Image"
              style={{ marginTop: "20px", width: "100%" }}
              objectFit="contain"
            />
          </Flex>
        )}
        <Text mt="20px" fontSize="18px">
          {truncateContent(post.data.content)}
        </Text>
      </Flex>
  );
};
