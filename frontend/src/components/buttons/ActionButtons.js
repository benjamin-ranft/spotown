import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components/macro";
import {MdDelete, MdModeEdit} from "react-icons/all";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";


export default function ActionButtons({id}){

    const history = useHistory();
    const {remove} = useContext(DiscoveriesContext);

    return(
        <StyledActionButtons>
            <div onClick={() => history.push(`/edit/${id}`)}>
                <StyledEditButton/>
            </div>
            <div onClick={handleDelete}>
                <StyledDeleteButton/>
            </div>
        </StyledActionButtons>
    )

    function handleDelete() {
        remove(id);
        history.goBack();
    }

}


const StyledActionButtons = styled.div`
justify-self: end;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 15px;
`

const StyledEditButton = styled(MdModeEdit)`
color: var(--dark-grey);
font-size: 25px;
`

const StyledDeleteButton = styled(MdDelete)`
color: var(--dark-grey);
font-size: 25px;
`
