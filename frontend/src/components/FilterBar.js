import React from "react";
import FilterTags from "./FilterTags";
import styled from "styled-components/macro";
import {MdClose} from "react-icons/all";

export default function FilterBar({filters, setFilters, handleClose}) {

    return(
        <StyledFilterBar>
            <StyledFilterTags filters={filters} setFilters={setFilters} handleClose={handleClose}/>
            <StyledCloseIcon onClick={handleClose}/>
        </StyledFilterBar>
    )
}

const StyledFilterBar = styled.div`
display: grid;
grid-template-columns:  1fr min-content 2%;
align-items: center;
`

const StyledFilterTags = styled(FilterTags)`
grid-column: 2;
display: inline-flex;
`

const StyledCloseIcon = styled(MdClose)`
  grid-column: 2;
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`