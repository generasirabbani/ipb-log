import { InputGroup, 
    Flex, 
    Input, 
    InputLeftElement
} from "@chakra-ui/react";
import {
    SearchIcon
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { searchPostsFromAPI } from "../../../config/redux/action";
import { useLocation } from "react-router-dom";

const SearchInput = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";
    const isDetail = location.pathname.includes("/post");

    const handleSearch = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log("userData : " + JSON.stringify(userData));
        console.log("userId: " + userData.uid);
        !isDashboard ? props.searchPosts(searchQuery, null) : props.searchPosts(searchQuery, userData.uid)
    };
    
    const onSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Flex flexGrow={1} mr={5} ml={5} align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color='gray.400' mb={1} />}
                />
                <Input 
                    isDisabled = {isDetail}
                    type="text"
                    placeholder="Cari Post"
                    value={searchQuery}
                    onChange={onSearchInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    fontSize='10pt'
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex>
    )
}

const reduxState = (state) => ({
    userData: state.user,
    isLogin: state.isLogin,
});
  
const reduxDispatch = (dispatch) => ({
  searchPosts: (query, userId) => dispatch(searchPostsFromAPI(query, userId)),
});

export default connect(reduxState, reduxDispatch)(SearchInput);