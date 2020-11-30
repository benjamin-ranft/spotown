import React from "react";
import {MdList, MdExplore} from "react-icons/all";
import styled from "styled-components/macro";
import AddIcon from "./icons/AddIcon";

export default function Footer({footerAction, setFooterAction}){
    return(
        <StyledFooter>
            <StyledListIcon onClick={handleListClick} footerAction={footerAction}/>
            <StyledDiv>
                <AddIcon/>
            </StyledDiv>
            <StyledMapIcon onClick={handleMapClick} footerAction={footerAction}/>
        </StyledFooter>
    )
    function handleListClick(){
        setFooterAction("list")
    }

    function handleMapClick(){
        setFooterAction("map")
    }
}

const StyledFooter = styled.div`
display: grid;
grid-gap: 30px;
position: relative;
grid-template-columns: 1fr 1fr;
grid-template-rows: 50px;
background-color: var(--white);
align-items: center;
justify-items: center;
max-height: 50px;
box-shadow: 0px -1px 9px 0px rgba(0,0,0,0.37);
`

const StyledListIcon = styled(MdList)`
font-size: 35px;
color: ${(props) => props.footerAction === 'list' ? "var(--accent-red)" : "var(--dark-grey)"};
`

const StyledDiv = styled.div`
position: absolute;
bottom: 5px;
left: auto;
right: auto;
`

const StyledMapIcon = styled(MdExplore)`
font-size: 35px;
color: ${(props) => props.footerAction === 'map' ? "var(--accent-red)" : "var(--dark-grey)"};
`
