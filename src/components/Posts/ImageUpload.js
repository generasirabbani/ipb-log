import React, { useRef, useState } from "react";
import { Flex, Stack, Button, Image } from "@chakra-ui/react";

const ImageUpload = ({
  setImageShown,
  setSelectedTab,
  onSelectImage,
  imageShown
}) => {
  const selectFileRef = useRef(null);

  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {imageShown ? (
        <>
          <Image
            src={imageShown}
            maxWidth="400px"
            maxHeight="400px"
          />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setImageShown("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          borderRadius={4}
          width="100%"
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => selectFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;