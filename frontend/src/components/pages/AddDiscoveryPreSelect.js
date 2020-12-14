import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddNewDiscoveryMap from "../uiElements/maps/AddNewDiscoveryMap";
import styled from "styled-components/macro";
import { MdAddLocation, MdKeyboardArrowLeft } from "react-icons/md";

const centerHamburg = {
  lat: 53.551086,
  lng: 9.993682,
};

export default function AddDiscoveryPreSelect() {
  const history = useHistory();
  const [center, setCenter] = useState(centerHamburg);
  const [placeId, setPlaceId] = useState("");
  const manualAddLink = "/new/confirm/?manual_place_id=" + placeId;

  return (
    <Layout>
      <Header>
        <StyledBackButton onClick={handleGoBack} />
        <h1>SELECT</h1>
      </Header>
      <MapLayout>
        <AddNewDiscoveryMap
          center={center}
          setCenter={setCenter}
          setPlaceId={setPlaceId}
        />
      </MapLayout>
      <BackgroundCard>
        <LocationSuggestions />
        <ManualAddButton href={manualAddLink}>
          <ButtonLayout>
            <StyledLocationPin />
            <p>Add something here</p>
          </ButtonLayout>
        </ManualAddButton>
      </BackgroundCard>
    </Layout>
  );

  function handleGoBack() {
    history.goBack();
  }
}

const Layout = styled.main`
  display: grid;
  grid-template-rows: 23px min-content 1fr min-content 23px;
  height: 100%;
  height: -moz-available;          /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  height: fill-available;
  grid-template-columns: 23px 1fr 23px;
`;

const MapLayout = styled.section`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 3/5;
  height: 100%;
`;

const BackgroundCard = styled.section`
  grid-row-start: 4;
  grid-row-end: 6;
  grid-column-start: 1;
  grid-column-end: 4;
  display: grid;
  grid-template-columns: 23px 1fr 23px;
  grid-template-rows: min-content min-content 23px;
  z-index: 10;
`;

const LocationSuggestions = styled.aside`
  grid-row: 1;
`;

const ManualAddButton = styled.a`

  background-color: white;
  padding: 10px;
  border-color: var(--dark-grey);
  box-shadow: var(--center-box-shadow);
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--dark-grey);
  font-weight: bold;

  display: grid;
  position: fixed;
  bottom: 23px;
  left: 50%;
    transform: translate(-50%, 0);
  width: 80%;
`;

const ButtonLayout = styled.div`
display: flex;
flex-direction: row;
  justify-self: center;
  align-items: center;
`;

const StyledLocationPin = styled(MdAddLocation)`
  color: var(--dark-grey);
  font-size: 30px;
`;

const StyledBackButton = styled(MdKeyboardArrowLeft)`
  color: var(--darkest-grey);
  font-size: 40px;
`;

const Header = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  align-items: center;
  grid-column: 2;
  grid-row: 2;

  h1 {
    justify-self: center;
    font-size: var(--size-xl);
  }
`;
