import React from "react";
import styled from "styled-components/macro";
import InputField from "./InputField";
import AddFilters from "./filters/AddFilters";

export default function DiscoveryForm({ onSave, discovery, setDiscovery }) {
  return (
    <Form onSubmit={handleSubmit}>
      <AddFilters
        tags={discovery.tags}
        setTags={(tags) => setDiscovery({ ...discovery, tags })}
      />
      <label>
        <InputField
          name="name"
          placeholder="Name"
          value={discovery.name}
          onChange={handleChange}
          type="text"
        />
      </label>
      <label>
        <InputField
          name="address"
          placeholder="Address"
          value={discovery.address}
          onChange={handleChange}
          type="text"
        />
      </label>
      <label>
        <InputField
          name="webUrl"
          placeholder="Link"
          value={discovery.webUrl}
          onChange={handleChange}
          type="text"
        />
      </label>
      <label>
        <InputField
          name="phoneNumber"
          placeholder="Phone"
          value={discovery.phoneNumber}
          onChange={handleChange}
          type="text"
        />
      </label>
      <label>
        <NotesInput
          name="notes"
          placeholder="Notes"
          value={discovery.notes}
          onChange={handleChange}
        />
      </label>
      <button>Save</button>
    </Form>
  );

  function handleChange(event) {
    setDiscovery({ ...discovery, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(discovery);
  }
}

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(7, min-content);
  row-gap: 10px;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 4;

  button {
    display: block;
    color: white;
    background-color: var(--accent-red);
    border-radius: 100px;
    padding: var(--size-l);
    width: 100%;
    border: none;
    font-weight: bold;
    font-size: var(--size-l);
    outline: none;
  }

  label {
    padding: 0;
  }
`;

const NotesInput = styled.textarea`
  display: block;
  background-color: var(--light-grey);
  border-radius: 10px;
  padding: var(--size-l);
  color: var(--dark-grey);
  width: 100%;
  border-width: thin;
  border-style: solid;
  border-color: lightgrey;
  resize: none;
  -webkit-appearance: none;

  :focus {
    outline: none;
  }
`;
