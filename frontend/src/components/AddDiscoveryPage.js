import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import DiscoveriesContext from "../contexts/DiscoveriesContext";
import {MdKeyboardArrowLeft} from "react-icons/md";
import styled from "styled-components/macro";
import DiscoveryForm from "./DiscoveryForm";

const initialState = {
    name: "",
    address: "",
    thumbnail: "",
    openingHours: "",
    phoneNumber: "",
    webUrl: "",
    directions: "",
    notes: "",
    tags: [],
}

export default function AddDiscoveryPage() {

    const {create} = useContext(DiscoveriesContext);
    const history = useHistory();
    const [discoveryData, setDiscoveryData] = useState(initialState);

    return(
        <StyledDiscoveryPage>
            <StyledAddHeader>
                <StyledBackButton onClick={handleGoBack}/>
                <h1>Add</h1>
            </StyledAddHeader>
            <DiscoveryForm onSave={handleSave} discovery={discoveryData} setDiscovery={setDiscoveryData}/>
        </StyledDiscoveryPage>
    )

    function handleGoBack(){
        history.goBack();
    }

    function handleSave(discovery){
        const {name, address, webUrl, phoneNumber, notes, tags} = discovery;
        create(name, address, webUrl, phoneNumber, notes, tags);
        history.push("/discoveries");
    }

}

const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--darkest-grey);
font-size: 40px;
`

const StyledDiscoveryPage = styled.div`
display: grid;
grid-template-rows: 23px min-content 1fr min-content 23px;

height: 100vh;

grid-template-columns: 23px auto 23px;
`

const StyledAddHeader = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;

align-items: center;
grid-column-start: 2;
  grid-column-end: 2;
grid-row-start: 2;

h1{
justify-self: center;
}
`
