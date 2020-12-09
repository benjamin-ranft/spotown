import React from "react";
import FilterTags from "./FilterTags";
import styled from "styled-components/macro";
import {MdClose} from "react-icons/md";

export default function FilterBar({filters, setFilters, handleClose}) {

    return(
        <Layout>
            <Filters filters={filters} setFilters={setFilters} handleClose={handleClose}/>
            <CloseIcon onClick={handleClose}/>
        </Layout>
    )
}

const Layout = styled.main`
display: grid;
grid-template-columns:  1fr min-content 2%;
align-items: center;
`

const Filters = styled(FilterTags)`
grid-column: 2;
display: inline-flex;
`

const CloseIcon = styled(MdClose)`
  grid-column: 2;
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`