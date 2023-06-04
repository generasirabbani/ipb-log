import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoImageOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePostLink = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  const onClick = () => {
    if(userData === null || props.userData === null) {
        navigate('/login');
    } else {
        navigate('/add-post');
    }
  }

  return (
    <Flex
        justify="space-evenly"
        align="center"
        bg="white"
        height="56px"
        w='475px'
        borderRadius={4}
        border="1px solid"
        borderColor="gray.300"
        p={2}
        mb={4}
    >
        <Icon as={CgProfile} fontSize={36} color="gray.300" mr={4} />
        <Input
        placeholder="Buat Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
        }}
        _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
        />
        <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
        onClick={onClick}
        />
        {/* <Icon
        as={BsLink45Deg}
        fontSize={24}
        color="gray.400"
        cursor="pointer"
        onClick={onClick}
        /> */}
    </Flex>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  
});

const reduxDispatch = (dispatch) => ({
    
});

export default connect(reduxState, reduxDispatch)(CreatePostLink);
