import React from "react";
import { FaSearch, BsFilter } from "react-icons/all";
import styled from "styled-components/macro";
import UserIcon from "../icons/UserIcon";
import SearchBar from "./SearchBar";
import FilterBar from "./filters/FilterBar";

export default function Header({
  headerAction,
  setHeaderAction,
  searchTerm,
  setSearchTerm,
  setFilters,
  filters,
}) {
  return (
    <Layout>
      <InnerLayout>
        <Title>DISCOVERIES</Title>
        <Actions>
          <SearchIcon onClick={handleSearchClick} className={headerAction} />
          <FilterIcon onClick={handleFilterClick} className={headerAction} />
          <UserIcon />
        </Actions>
      </InnerLayout>
      {headerAction === "search" && (
        <SubHeader>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClose={handleSearchClick}
          />
        </SubHeader>
      )}
      {headerAction === "filter" && (
        <SubHeader>
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            handleClose={handleFilterClick}
          />
        </SubHeader>
      )}
    </Layout>
  );

  function handleSearchClick() {
    if (headerAction !== "search") {
      setHeaderAction("search");
    } else {
      setHeaderAction("");
      setSearchTerm("");
    }
  }

  function handleFilterClick() {
    if (headerAction !== "filter") {
      setHeaderAction("filter");
    } else {
      setHeaderAction("");
      setFilters("");
    }
  }
}

const Layout = styled.main`
  display: grid;
  grid-template-rows: min-content min-content;
  box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.37);
`;

const SubHeader = styled.section`
  height: 50px;
`;

const InnerLayout = styled.section`
  justify-items: start;
  padding: 10px 15px;
  grid-template-rows: 50px;
  background-color: var(--white);
  color: var(--darkest-grey);
  font-weight: bold;
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
`;

const Title = styled.h1`
  font-size: var(--size-xl);
`;

const Actions = styled.aside`
  justify-items: end;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  align-items: center;
`;

const SearchIcon = styled(FaSearch)`
  font-size: var(--size-lplus);
  color: var(--dark-grey);

  &.search {
    color: var(--accent-red);
  }
`;
const FilterIcon = styled(BsFilter)`
  font-size: var(--size-xxl);
  color: var(--dark-grey);

  &.filter {
    color: var(--accent-red);
  }
`;
