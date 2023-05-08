import React from "react";
import styled from "styled-components";

const Main = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
`;

const Title = styled.h1`
    font-family: 'Poppins';
    font-weight: 700;
    color: #263C92;
    position: absolute;
    width: 128px;
    height: 60px;
    left: 70px;
    top: 9px;
`;

const Search = styled.h1`

`;

function Header (){
    return (
        <Main>
            <Title>IPBLog</Title> 
        </Main>
    )
};

export default Header;