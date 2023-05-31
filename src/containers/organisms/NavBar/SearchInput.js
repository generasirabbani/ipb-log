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

const SearchInput = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        props.searchPosts(searchQuery);
    };
    
    const onSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Flex flexGrow={1} mr={10} ml={10} align="center">
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input 
                    type="text"
                    placeholder="Search posts..."
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
                    height="40px"
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
  searchPosts: (query) => dispatch(searchPostsFromAPI(query)),
});

export default connect(reduxState, reduxDispatch)(SearchInput);