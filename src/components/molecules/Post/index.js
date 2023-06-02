import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

export const Post = ({ post, _hover }) => {
  return (
    <Box
      border='1px solid rgba(0, 0, 0, 0.1)'
      padding='16px'
      bg='white'
      minW='435px'
      minH='150px'
      transition='all ease 0.35s'
      _hover={_hover}
    >
      <Text fontSize='24px' fontWeight='bold'>
        {post.data.title}
      </Text>
      <Text fontSize='12px'>
        {new Date(post.data.createdAt).toDateString()}
      </Text>
      {post.data.image && (
        <Image
          maxH='400px'
          maxW='400px'
          align='center'
          src={post.data.image}
          alt='Post Image'
          style={{ marginTop: "20px", width: "100%" }}
        />
      )}
      <Text mt='20px' fontSize='14px'>
        {post.data.content}
      </Text>
    </Box>
  );
};
