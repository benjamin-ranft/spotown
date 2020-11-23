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
display: grid;
grid-template-columns: 1fr 1fr;
justify-items: right;
`

const StyledEditButton = styled(MdModeEdit)`
color: var(--dark-grey);
font-size: 40px;
`

const StyledDeleteButton = styled(MdDelete)`
color: var(--dark-grey);
font-size: 40px;
`