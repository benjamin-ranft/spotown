import React from "react";
import InputField from "./InputField";
import styled from "styled-components/macro";
import { MdClose } from "react-icons/md";

export default function SearchBar({ searchTerm, setSearchTerm, handleClose }) {
  return (
    <Layout>
      <Input
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        type="text"
      />
      <CloseIcon onClick={handleClose} />
    </Layout>
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
}

const Layout = styled.main`
  display: grid;
  grid-template-columns: 15px 1fr min-content 15px;
  grid-template-rows: 2% 1fr 4%;
  background-color: white;
  align-items: center;
`;

const CloseIcon = styled(MdClose)`
  grid-row: 2;
  grid-column: 3;
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`;

const Input = styled(InputField)`
  grid-row: 2;
  grid-column: 2;
  border-radius: 100px;
  height: 40px;
`;
