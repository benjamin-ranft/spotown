import React from "react";
import FilterTags from "./FilterTags";
import styled from "styled-components/macro";
import {MdClose} from "react-icons/all";

export default function FilterBar({filters, setFilters, handleClose}) {

    return(
        <StyledFilterBar>
            <FilterTags filters={filters} setFilters={setFilters} handleClose={handleClose}/>
            <StyledCloseIcon onClick={handleClose}/>
        </StyledFilterBar>
    )
}

const StyledFilterBar = styled.div`
display: grid;
grid-template-rows: 1fr;
grid-template-columns: min-content min-content;
width: 100%;
padding: 5px;
`

const StyledCloseIcon = styled(MdClose)`
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`