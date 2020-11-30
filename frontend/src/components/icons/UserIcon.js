import React, {useState} from "react";
import styled from "styled-components/macro";
import UserProfilePopup from "../UserProfilePopup";

export default function UserIcon(){

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return(
        <>
            <UserIconStyled placeholder={"/images/spotown_user_placeHolder_grey.png"} onClick={togglePopup}/>
            {isOpen && <UserProfilePopup handleClose={togglePopup}/>}
        </>
    )
}

const UserIconStyled = styled.div`
background-image: url(${(props) => props.placeholder});
background-repeat: no-repeat;
background-size: cover;
height: 30px;
width: 30px;
border-radius: 30px;

`