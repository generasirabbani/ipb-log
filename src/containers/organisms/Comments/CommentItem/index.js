import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import 'moment/locale/id'
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const CommentItem = ({
  comment,
  onDeleteComment,
  onEditComment,
  isLoading,
  userId,
}) => {
  // useEffect(() => {
  //   // console.log("from commentitem: " + JSON.stringify(userId));
  // }, []);

  return (
    <Flex>
      <Box mr={2}>
        <Icon as={CgProfile} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} fontSize="8pt">
          <Text
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.data?.commenterName}
          </Text>
          <Text color="gray.600">
            {moment(new Date(comment.data?.createdAt)).locale("id").fromNow()}
          </Text>
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.data?.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          fontWeight={600}
          color="gray.500"
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.data?.commenterId && (
            <>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onEditComment(comment)}
              >
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
