import React, {useContext} from "react";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components/macro";
import {MdKeyboardArrowLeft, MdShare} from "react-icons/md";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
import ActionButtons from "../buttons/ActionButtons";
import DirectionsButton from "../buttons/DirectionsButton";
import CallButton from "../buttons/CallButton";
import WebsiteButton from "../buttons/WebsiteButton";
import {VscLocation, RiCheckboxMultipleFill} from "react-icons/all";
import useCopyToClipboard from "../utils/useCopyToClipboard";

export default function DiscoveryDetails(){
    const {discoveries} = useContext(DiscoveriesContext);
    const {id} = useParams();
    const history = useHistory();
    const discovery = discoveries.find((discovery)=> discovery.id === id);
    const [isCopied, handleCopy] = useCopyToClipboard(5000);
    const sharingLink = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + discovery?.place_id;
console.log(discovery);
    return !discovery ? null : (
        <Layout>
            <BackgroundImage thumbnail={discovery.thumbnail}>
                <Header>
                    <BackButton onClick={handleCancel}/>
                    <ShareButton
                        onClick={() => handleCopy(sharingLink)}>
                        {!isCopied ? <ShareIcon/> : <CopiedIcon/>}
                    </ShareButton>
                </Header>
            </BackgroundImage>
            <Details>
                <AddressAndActions>
                    <Address>
                        <LocationIcon/>
                        <p>{discovery.address}</p>
                    </Address>
                    <Actions id={id}/>
                </AddressAndActions>
                    <DiscoveryName>{discovery.name.substring(0, 50)}</DiscoveryName>
                <ContactLinks>
                    <DirectionsButton onClick={()=> window.open(discovery.directions)}/>
                    <CallButton phoneNumber={"tel:" + discovery.phoneNumber}/>
                    <WebsiteButton onClick={()=> window.open(discovery.webUrl)}/>
                </ContactLinks>
                <Notes>
                    <h3>Notes</h3>
                    <p>{discovery.notes}</p>
                </Notes>
            </Details>
        </Layout>
    )

    function handleCancel(){
        history.goBack();
    }

}

const Layout = styled.main`
display: grid;
grid-template-rows: 1fr min-content;
grid-template-columns: 100%;
height: 100vh;

`
const Header = styled.section`
background-image: linear-gradient(rgba(0,0,0,0.8), transparent);
grid-row: 1;
display: grid;
grid-template-columns: 23px 1fr 1fr 23px;
grid-template-rows: 23px 1fr;
`

const BackgroundImage = styled.section`
background-image: url(${(props) => props.thumbnail});
background-repeat: no-repeat;
background-size: cover;
margin-bottom: -20px;
background-position: center;
`

const Details = styled.section`
display: grid;
grid-template-rows: repeat(4 1fr);
grid-row-gap: 12px;
grid-row-start: 2;
background-color: var(--white);
border-radius: 25px 25px 0 0;
box-shadow: var(--center-box-shadow);
padding: 20px;
min-height: 40vh;
`

const DiscoveryName = styled.h2`
font-size: var(--size-lplus);
grid-row: 2;
display: flex;
flex-direction: column;
`

const AddressAndActions = styled.section`
grid-row: 1;
display: grid;
grid-template-columns: 1fr 0.3fr;
align-items: center;
`

const Address = styled.aside`
display: flex;
flex-direction: row;
align-items: center;

p{
font-size: var(--size-m);
}
`

const LocationIcon = styled(VscLocation)`
font-size: 20px;
color: var(--darkest-grey);
`

const Actions = styled(ActionButtons) `
justify-self: right;
`

const ContactLinks = styled.section`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 16px;

a {
  color: var(--darkest-grey);
  text-decoration: none; 
}
`

const Notes = styled.aside`
display: block;
grid-column: 1/2;
grid-row: 4;
`

const BackButton = styled(MdKeyboardArrowLeft)`
color: var(--white);
font-size: 40px;
justify-self: left;
grid-column: 2;
grid-row: 2;
`
const ShareButton = styled.a`
grid-column: 3;
grid-row: 2;
justify-self: right;
`
const ShareIcon = styled(MdShare)`
color: var(--white);
font-size: 32px;
`

const CopiedIcon = styled(RiCheckboxMultipleFill)`
color: var(--white);
font-size: 32px;
`




