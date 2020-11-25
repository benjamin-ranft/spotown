import React, {useContext} from "react";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
import {useHistory, useParams} from "react-router-dom";
import DiscoveryForm from "../DiscoveryForm";
import styled from "styled-components/macro";
import {MdKeyboardArrowLeft} from "react-icons/md";

export default function AddDiscoveryPage() {

    const {discoveries, update} = useContext(DiscoveriesContext);
    const history = useHistory();
    const {id} = useParams();
    const discovery = discoveries.find((discovery) => discovery.id === id)


    return(
        <StyledDiscoveryPage>
            <StyledThumbnailSection thumbnail={discovery.thumbnail}>
                    <StyledAddHeader>
                            <StyledBackButton onClick={handleGoBack}/>
                            <h1>Edit</h1>
                    </StyledAddHeader>
            </StyledThumbnailSection>
            <StyledFormSection>
                <DiscoveryForm onSave={handleSave} discovery={discovery}/>
            </StyledFormSection>
        </StyledDiscoveryPage>
    )

    function handleGoBack(){
        history.goBack();
    }

    function handleSave(discovery){
        const {name, address, webUrl, phoneNumber, notes, tags} = discovery;
        update(name, address, webUrl, phoneNumber, notes, tags);
        history.push("/discoveries");
    }

}

const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--white);
font-size: 40px;
grid-row-start: 2;
grid-row-end: 2;
grid-column: 2;
justify-self: start;
`

const StyledDiscoveryPage = styled.div`
display: grid;
grid-template-rows: 1fr min-content;
grid-template-columns: 100%;
height: 100vh;
`

const StyledThumbnailSection = styled.div`
background-image: url(${(props) => props.thumbnail});
background-repeat: no-repeat;
background-size: cover;
margin-bottom: -20px;

`

const StyledFormSection = styled.div`
background-color: var(--white);
border-radius: 25px 25px 0 0;
box-shadow: var(--center-box-shadow);
padding: 20px;
min-height: 40vh;
grid-column-start: 1;
grid-column-end: 4;

`

const StyledAddHeader = styled.div`
display:grid;
grid-template-columns: 23px 1fr 1fr 1fr 23px;
grid-template-rows: 23px 1fr;
align-items: center;

background-image: linear-gradient(rgba(0,0,0,0.8), transparent);

h1{
justify-self: center;
color: var(--white);
grid-row-start: 2;
grid-row-end: 2;
grid-column: 3;
}
`