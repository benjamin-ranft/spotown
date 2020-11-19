import React from "react";
import { FaSearch } from 'react-icons/fa';
import {BiUserCircle, BsFilter} from "react-icons/all";
import styled from "styled-components/macro";

export default function Header(){
    return(
        <StyledHeader>
            <h1>Discoveries</h1>
            <StyledIcons>
                <SearchIcon/>
                <FilterIcon/>
                <UserIcon/>
            </StyledIcons>
        </StyledHeader>
    )
}


const StyledHeader = styled.div`
justify-items: start;
padding: 10px;
position: fixed;
  top: 0;
  width: 100%;
background-color: var(--white);
color: var(--darkest-grey);
font-weight: bold;
display: grid;
grid-template-columns: 55% 45%;
grid-template-rows: 50px;
align-items: center;
box-shadow: 0px 1px 9px 0px rgba(0,0,0,0.37);
`

const StyledIcons = styled.div`
justify-items: end;
width: 100%;
display: grid;
grid-template-columns: repeat(3,33%);
align-items: center;
`

const SearchIcon = styled(FaSearch)`
font-size: var(--size-lplus);
color: var(--dark-grey);
`
const FilterIcon = styled(BsFilter)`
font-size: var(--size-xxl);
color: var(--dark-grey);
`
const UserIcon = styled(BiUserCircle)`
font-size: 30px;
color: var(--dark-grey);
`
