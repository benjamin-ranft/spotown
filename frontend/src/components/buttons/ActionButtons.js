import React from "react";
import styled from "styled-components/macro";
import {MdDelete, MdModeEdit} from "react-icons/all";

export default function ActionButtons(){
    return(
        <StyledActionButtons>
            <StyledEditButton/>
            <StyledDeleteButton/>
        </StyledActionButtons>
    )
}

const StyledActionButtons = styled.div`
justify-self: end;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 8px;
`

const StyledEditButton = styled(MdModeEdit)`
color: var(--dark-grey);
font-size: 25px;
`

const StyledDeleteButton = styled(MdDelete)`
color: var(--dark-grey);
font-size: 25px;
`