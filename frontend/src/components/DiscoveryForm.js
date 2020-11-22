import React, {useState} from "react";
import {useHistory} from "react-router-dom";

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
    const history = useHistory();

    return(
        <form onSubmit={handleSubmit}>
            <label>
                <input
                name="name"
                placeholder="Name"
                value={discoveryData.name}
                onChange={handleChange}
                type="text"/>
            </label>
            <label>
                <input
                    name="address"
                    placeholder="Address"
                    value={discoveryData.address}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <input
                    name="webUrl"
                    placeholder="Link"
                    value={discoveryData.webUrl}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <input
                    name="phoneNumber"
                    placeholder="Phone"
                    value={discoveryData.phoneNumber}
                    onChange={handleChange}
                    type="text"/>
            </label>
            <label>
                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={discoveryData.notes}
                    onChange={handleChange}
                    />
            </label>
            <label>
                <input
                    name="tags"
                    placeholder="Tags"
                    value={discoveryData.tags}
                    onChange={handleTags}
                    type="text"/>
            </label>
            <button onClick={onCancel}>Cancel</button>
            <button>Save</button>
        </form>

    )

    function onCancel(){
        history.goBack();
    }

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