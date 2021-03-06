import React from "react";
import styled from "styled-components/macro";

export default function InputField({ children, ...rest }) {
  return <Input {...rest}>{children}</Input>;
}

const Input = styled.input`
  display: block;
  background-color: var(--light-grey);
  border-radius: 10px;
  padding: var(--size-l);
  color: var(--dark-grey);
  width: 100%;
  border-width: thin;
  border-style: solid;
  border-color: lightgrey;
  -webkit-appearance: none;

  :focus {
    outline: none;
  }
`;
