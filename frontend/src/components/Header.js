import React from "react";
import {FaSearch, BsFilter} from "react-icons/all";
import styled from "styled-components/macro";
import UserIcon from "./icons/UserIcon";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export default function Header({headerAction, setHeaderAction, setSearchTerm, setFilters, filters}){

    return(
        <StyledHeaderLayout>
            <StyledHeader>
                <h1>Discoveries</h1>
                <StyledIcons>
                    <SearchIcon onClick={handleSearchClick} color={headerAction}/>
                    <FilterIcon onClick={handleFilterClick} color={headerAction}/>
                    <UserIcon/>
                </StyledIcons>
            </StyledHeader>
            {headerAction === "search" && <StyledActionSection>
                <SearchBar setSearchTerm={setSearchTerm} handleClose={handleSearchClick}/>
            </StyledActionSection>}
            {headerAction === "filter" && <StyledActionSection>
                <FilterBar filters={filters} setFilters={setFilters} handleClose={handleFilterClick}/>
            </StyledActionSection>}
        </StyledHeaderLayout>
    )

    function handleSearchClick(){
        if (headerAction !== "search"){
            setHeaderAction("search");

        } else {
            setHeaderAction("")
        }
    }

    function handleFilterClick(){
        if (headerAction !== "filter"){
            console.log(headerAction);
             setHeaderAction("filter");

        } else {
             setHeaderAction("")
        }

    }
}

const StyledHeaderLayout = styled.div`
display: grid;
grid-template-rows: min-content min-content;
`

const StyledActionSection = styled.div`
height: 50px;
padding: 5px;
`

const StyledHeader = styled.div`
justify-items: start;
padding: 10px;
grid-template-rows: 50px;
background-color: var(--white);
color: var(--darkest-grey);
font-weight: bold;
display: grid;
grid-template-columns: 55% 45%;
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
color: ${props => props.headerAction === 'filter' && "var(--accent-red)"};
`
const FilterIcon = styled(BsFilter)`
font-size: var(--size-xxl);

color: ${(props) => props.headerAction === 'filter' && "var(--accent-red)"};
`
