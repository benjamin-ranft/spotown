import React, {useContext} from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components/macro";
import {MdDelete, MdModeEdit} from "react-icons/all";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";

export default function ActionButtons(handleEdit, handleDelete){

    const history = useHistory();
    const {discoveries} = useContext(DiscoveriesContext);
    const {id} = useParams();
    const discovery = discoveries.find((discovery)=> discovery.id === id);

    return(
        <StyledActionButtons>
            <div onClick={() => history.push(`/discovery/${discovery.id}`)}>
                <StyledEditButton/>
            </div>
            <div onClick={handleDelete}>
                <StyledDeleteButton/>
            </div>
        </StyledActionButtons>
    )
}

const StyledActionButtons = styled.div`
justify-self: end;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 8px;
`

const StyledEditButton = styled(MdModeEdit)`
color: var(--dark-grey);
font-size: 25px;
`

const StyledDeleteButton = styled(MdDelete)`
color: var(--dark-grey);
font-size: 25px;
`