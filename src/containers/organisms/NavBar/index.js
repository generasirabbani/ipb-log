import React from "react";
import "./Header.scss"
import { VStack } from "@chakra-ui/react";
import { connect } from "react-redux";

function NavBar (){
    return(
        <React.Fragment>
            <VStack w="100%" h="80px" bg="white">
                <h1>IPBLog</h1>
            </VStack>
        </React.Fragment>
    )
};

export default connect(null, null)(NavBar);