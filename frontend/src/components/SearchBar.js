import React from "react";
import InputField from "./uiElements/InputField";
import styled from "styled-components/macro";
import {MdClose} from "react-icons/all";

export default function SearchBar({setSearchTerm, handleClose}){
    return(
        <StyledDiv>
        <StyledInputField
            name="search"
            placeholder="Search"
            value={""}
            onChange={handleChange}
            type="text"
        />
           <StyledCloseIcon onClick={handleClose}/>
        </StyledDiv>

    )

    function handleChange (event){
        setSearchTerm(event.target.value)
    }

}

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 2% 1fr min-content 2%;
grid-template-rows: 2% 1fr 4%;
background-color: white;
align-items: center;
`

const StyledCloseIcon = styled(MdClose)`
  grid-row: 2;
  grid-column: 3;
  padding: 5px;
  justify-self: end;
  color: var(--dark-grey);
  font-size: 30px;
`

const StyledInputField = styled(InputField)`
grid-row: 2;
grid-column: 2;
border-radius: 100px;
height: 40px;

`
