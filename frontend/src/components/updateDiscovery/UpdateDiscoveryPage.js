import React, {useContext} from "react";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
import {useHistory} from "react-router-dom";
import DiscoveryForm from "../DiscoveryForm";
import styled from "styled-components/macro";
import {MdKeyboardArrowLeft} from "react-icons/md";

export default function AddDiscoveryPage() {

    const {update} = useContext(DiscoveriesContext);
    const history = useHistory();

    return(
        <StyledDiscoveryPage>
            <StyledAddHeader>
                <StyledBackButton onClick={handleGoBack}/>
                <h1>Edit</h1>
            </StyledAddHeader>
            <DiscoveryForm onSave={handleSave}/>
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