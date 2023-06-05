import React from "react";
import { useState } from "react";
import { Stack, Input, Textarea, Flex, Button, Text, InputLeftElement, InputGroup, InputRightElement } from "@chakra-ui/react";

const TextInputs = ({
  textInputs,
  onChange,
  handleCreatePost,
  handleUpdatePost,
  loading,
  isUpdating,
  cancelUpdate
}) => {
  const [titleCharCount, setTitleCharCount] = useState(textInputs.title.length);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 50) {
      onChange(event);
      setTitleCharCount(value.length);
    }
  };

  return (
    <Stack spacing={3} width="100%">
      <Flex justify="space-between">
        <InputGroup>
          <Input
            name="title"
            value={textInputs.title}
            onChange={handleTitleChange}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "black",
            }}
            fontSize="10pt"
            borderRadius={4}
            placeholder="Title"
          />
          <InputRightElement fontSize="10pt" color={titleCharCount > 50 ? "red" : "gray.500"}>
            {titleCharCount}/50
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        height="100px"
      />
      <Flex justify="flex-end">
        {isUpdating ? (
          <>
            <Button
              height="34px"
              padding="0px 30px"
              isLoading={loading}
              onClick={handleUpdatePost}
              colorScheme="blue"
            >
              Update
            </Button>
            <Button
              height="34px"
              padding="0px 30px"
              isLoading={loading}
              onClick={cancelUpdate}
              colorScheme="red"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            height="34px"
            padding="0px 30px"
            disabled={!textInputs.title}
            isLoading={loading}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        )}
      </Flex>
    </Stack>
  );
};

export default TextInputs;
