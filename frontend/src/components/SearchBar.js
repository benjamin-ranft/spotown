import React from "react";
import InputField from "./uiElements/InputField";
import styled from "styled-components/macro";
import {MdClose} from "react-icons/all";

export default function SearchBar({setSearchTerm, handleClose}){
    return(
        <>
        <InputField
            name="search"
            placeholder="Search"
            value={""}
            onChange={handleChange}
            type="text"
        />
           <StyledCloseIcon onClick={handleClose}/>
        </>

    )

    function handleChange (event){
        setSearchTerm(event.target.value)
    }

}

const StyledCloseIcon = styled(MdClose)`
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`

const StyledInputField = styled(InputField)`
border-radius: 100px;
`
