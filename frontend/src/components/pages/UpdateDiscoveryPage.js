import React, { useContext, useEffect, useState } from "react";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
import { useHistory, useParams } from "react-router-dom";
import DiscoveryForm from "../uiElements/DiscoveryForm";
import styled from "styled-components/macro";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {getDetails} from "use-places-autocomplete";
import {useLoadScript} from "@react-google-maps/api";

const libraries = ["places"];

export default function UpdateDiscoveryPage() {

  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
    version: "3.42.9",
    libraries,
  });

  const { discoveries, update } = useContext(DiscoveriesContext);
  const history = useHistory();
  const { id } = useParams();
  const [discovery, setDiscovery] = useState();
  const placeId = discovery?.place_id;
  const [thumbnail, setThumbnail] = useState("../images/discovery_placeholder.png");

  useEffect(()=>{
  setDiscovery(discoveries.find((discovery) => discovery.id === id));
  },[discoveries, setDiscovery, id])

  useEffect(() => {
    if (placeId && isLoaded) {
      getDetails({placeId: placeId,
        fields:[
          "photos",
        ],
      }).then((data) =>
          setThumbnail(
              data.photos[0].getUrl({ maxWidth: 600, maxHeight: 600 })
          )
      )
    }
    // eslint-disable-next-line
  }, [placeId, isLoaded]);


  return !discovery ? null :(
    <Layout>
      <Thumbnail thumbnail={thumbnail}>
        <Header>
          <BackButton onClick={handleGoBack} />
          <h1>EDIT</h1>
        </Header>
      </Thumbnail>
      <FormSection>
        <DiscoveryForm
          onSave={handleSave}
          discovery={discovery}
          setDiscovery={setDiscovery}
        />
      </FormSection>
    </Layout>
  );

  function handleGoBack() {
    history.goBack();
  }

  function handleSave(discovery) {
    const {
      id,
      timestamp,
      name,
      place_id,
      lat,
      lng,
      address,
      thumbnail,
      phoneNumber,
      webUrl,
      directions,
      notes,
      tags,
    } = discovery;
    update(
      id,
      timestamp,
      name,
      place_id,
      lat,
      lng,
      address,
      thumbnail,
      phoneNumber,
      webUrl,
      directions,
      notes,
      tags
    );
history.goBack();
  }
}

const BackButton = styled(MdKeyboardArrowLeft)`
  color: var(--white);
  font-size: 40px;
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column: 2;
  justify-self: start;
`;

const Layout = styled.main`
  display: grid;
  grid-template-rows: 1fr min-content;
  grid-template-columns: 100%;
  height: 100vh;
`;

const Thumbnail = styled.aside`
  background-image: url(${(props) => props.thumbnail});
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: -20px;
`;

const FormSection = styled.section`
  background-color: var(--white);
  border-radius: 25px 25px 0 0;
  box-shadow: var(--center-box-shadow);
  padding: 20px;
  min-height: 40vh;
  grid-column-start: 1;
  grid-column-end: 4;
`;

const Header = styled.section`
  display: grid;
  grid-template-columns: 23px 1fr 1fr 1fr 23px;
  grid-template-rows: 23px 1fr;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), transparent);

  h1 {
    justify-self: center;
    color: var(--white);
    font-size: var(--size-xl);
    grid-row-start: 2;
    grid-row-end: 2;
    grid-column: 3;
  }
`;
