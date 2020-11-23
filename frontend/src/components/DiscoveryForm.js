import React, {useState} from "react";
import styled from "styled-components/macro";
import InputField from "./uiElements/InputField";

const initialState = {
    name: "",
    address: "",
    webUrl: "",
    phoneNumber: "",
    notes: "",
    tags: [],
}

export default function DiscoveryForm({onSave, discovery = initialState}) {

    const [discoveryData, setDiscoveryData] = useState(discovery);
    const [tag, setTag] = useState("")

    return(
        <StyledForm onSubmit={handleSubmit}>
            <label>
                <InputField
                name="name"
                placeholder="Name"
                value={discoveryData.name}
                onChange={handleChange}
                type="text"/>
            </label>
            <label>
                <InputField
                    name="address"
                    placeholder="Address"
                    value={discoveryData.address}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <InputField
                    name="webUrl"
                    placeholder="Link"
                    value={discoveryData.webUrl}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <InputField
                    name="phoneNumber"
                    placeholder="Phone"
                    value={discoveryData.phoneNumber}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <StyledTextArea
                    name="notes"
                    placeholder="Notes"
                    value={discoveryData.notes}
                    onChange={handleChange}
                    />
            </label>
            <label>
                <InputField
                    name="tags"
                    placeholder="Tags"
                    value={discoveryData.tags}
                    onChange={handleTags}
                    type="text"/>
            </label>
            <button>Save</button>
        </StyledForm>

    )

    function handleChange(event){
        setDiscoveryData({ ...discoveryData, [event.target.name]:event.target.value})
    }

    function handleTags(){
        setDiscoveryData({...discoveryData, tags: [...discoveryData.tags, tag]});
        setTag("");
    }

    function handleSubmit(event){
        event.preventDefault();
        onSave(discoveryData);
    }
}

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  row-gap: 10px;
  grid-column-start: 2;
  grid-column-end: 2;
  
  button{
  display: block;
  color: white;
  background-color: var(--accent-red);
  border-radius: 100px;
  padding: var(--size-l);
  width: 100%;
  border: none;
  font-weight: bold;
  font-size: var(--size-l); 
  }
`

const StyledTextArea = styled.textarea`
display: block;
  background-color: var(--light-grey);
  border-radius: 10px;
  padding: var(--size-l);
  color: var(--dark-grey);
  width: 100%;
  border-width: thin;
  border-style: solid;
  border-color: lightgrey;
`
