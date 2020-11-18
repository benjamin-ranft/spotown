import React from "react";
import {MdAddLocation, MdList, MdExplore} from "react-icons/all";
import styled from "styled-components/macro";

export default function Footer(){
    return(
        <StyledFooter>
            <StyledListIcon/>
            <StyledAddIcon/>
            <StyledMapIcon/>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 50px;
width: 100%;
position: fixed;
bottom: 0;
background-color: var(--white);
align-items: center;
justify-items: center;
box-shadow: 0px -1px 9px 0px rgba(0,0,0,0.37);
`

const StyledListIcon = styled(MdList)`
font-size: 35px;
color: var(--dark-grey);
`

const StyledAddIcon = styled(MdAddLocation)`
font-size: 80px;
color: var(--accent-red);
margin-bottom: 35px;
`

const StyledMapIcon = styled(MdExplore)`
font-size: 35px;
color: var(--dark-grey);
`