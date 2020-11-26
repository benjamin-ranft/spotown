import React, {useState} from "react";
import styled from "styled-components/macro";
import {BiUserCircle} from "react-icons/all";
import UserProfilePopup from "../UserProfilePopup";

export default function UserIcon(){

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return(
        <>
            <UserIconStyled onClick={togglePopup}/>
            {isOpen && <UserProfilePopup handleClose={togglePopup}/>}
        </>
    )
}

const UserIconStyled = styled(BiUserCircle)`
font-size: 30px;
color: var(--dark-grey);
`