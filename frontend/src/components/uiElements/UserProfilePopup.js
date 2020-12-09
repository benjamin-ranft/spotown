import React, {useContext} from "react";
import styled from "styled-components/macro";
import UserContext from "../../contexts/UserContext";
import {useHistory} from "react-router-dom";
import {MdClose} from "react-icons/all";

export default function UserProfilePopup ({handleClose}){

    const {userData, logout} = useContext(UserContext);
    const history = useHistory();

    return(
        <StyledPopUpBox onClick={handleClose}>
            <StyledBox>
                <StyledCloseIcon onClick={handleClose}/>
                    <StyledProfileImage profileImage="/images/spotown_user_placeHolder_red.png"/>
                    <StyledUsername>{userData.sub}</StyledUsername>
                    <StyledLogoutButton onClick={handleLogout}>Log out</StyledLogoutButton>
            </StyledBox>
        </StyledPopUpBox>
    )

    function handleLogout (){
        logout();
        history.push("/login")
    }
}

const StyledProfileImage = styled.div`
grid-column: 2;
grid-row: 2;
height: 200px;
width: 200px;
border-radius: 200px;
background-image: url(${(props) => props.profileImage});
background-repeat: no-repeat;
background-size: cover;
justify-self: center;
`

const StyledUsername = styled.h1`
grid-column: 2;
grid-row: 3;
justify-self: center;
`

const StyledLogoutButton = styled.button`
  grid-column: 2;
  grid-row: 4;
  justify-self: center;
  
  display: block;
  color: white;
  background-color: var(--accent-red);
  border-radius: 100px;
  padding: var(--size-l);
  width: 100%;
  border: none;
  font-weight: bold;
  font-size: var(--size-l); 
`

const StyledPopUpBox = styled.div`
position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 97;
`

const StyledBox = styled.div`
  display: grid;
  row-gap: 20px;
  grid-template-rows: 3px 1fr 0.5fr min-content 3px;
  grid-template-columns: 20px 1fr 20px;
  position: relative;
  width: 85%;
  margin: 0 auto;
  height: min-content;
  max-height: 80vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
  z-index: 98;
`

const StyledCloseIcon = styled(MdClose)`
  grid-column: 3;
  grid-row: 1;
  padding: 5px;
  justify-self: center;
  color: var(--darkest-grey);
  font-size: 40px;
  z-index: 99;
`

