import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import DiscoveriesContext from "../contexts/DiscoveriesContext";
import {MdKeyboardArrowLeft} from "react-icons/md";
import styled from "styled-components/macro";
import DiscoveryForm from "./DiscoveryForm";

export default function AddDiscoveryPage() {

    const {create} = useContext(DiscoveriesContext);
    const history = useHistory();

    return(
        <>
            <div>
                <StyledBackButton onClick={handleGoBack}/>
                <h1>ADJUST</h1>
            </div>
            <DiscoveryForm onSave={handleSave}/>
        </>
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
color: white;
`