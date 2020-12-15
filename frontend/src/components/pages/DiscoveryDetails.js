import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { MdKeyboardArrowLeft, MdShare } from "react-icons/md";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
import ActionButtons from "../buttons/ActionButtons";
import DirectionsButton from "../buttons/DirectionsButton";
import CallButton from "../buttons/CallButton";
import WebsiteButton from "../buttons/WebsiteButton";
import { VscLocation, RiCheckboxMultipleFill } from "react-icons/all";
import useCopyToClipboard from "../utils/useCopyToClipboard";
import { useLoadScript } from "@react-google-maps/api";
import { getDetails } from "use-places-autocomplete";

const libraries = ["places"];

export default function DiscoveryDetails() {
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
    version: "3.42.9",
    libraries,
  });

  const { discoveries } = useContext(DiscoveriesContext);
  const { id } = useParams();
  const history = useHistory();
  const discovery = discoveries.find((discovery) => discovery.id === id);
  const placeId = discovery?.place_id;
  const [isCopied, handleCopy] = useCopyToClipboard(5000);

  function sharingLink() {
    if (placeId === "manual_place_id") {
      return (
        "https://maps.google.com/?q=" + discovery?.lat + "," + discovery?.lng
      );
    } else {
      return (
        "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" +
        discovery.place_id
      );
    }
  }

  const [thumbnail, setThumbnail] = useState(
    "../images/discovery_placeholder.png"
  );

  useEffect(() => {
    if (placeId === "manual_place_id" && isLoaded) {
      setThumbnail("/images/discovery_placeholder.png");
    } else if (placeId && placeId !== "manual_place_id" && isLoaded) {
      getDetails({ placeId: placeId, fields: ["photos"] }).then((data) =>
        setThumbnail(data.photos[0].getUrl({ maxWidth: 600, maxHeight: 600 }))
      );
    }
    // eslint-disable-next-line
  }, [placeId, isLoaded]);

  return !discovery ? null : (
    <Layout>
      <BackgroundImage thumbnail={thumbnail}>
        <Header>
          <BackButton onClick={handleCancel} />
          <ShareButton onClick={() => handleCopy(sharingLink())}>
            {!isCopied ? <ShareIcon /> : <CopiedIcon />}
          </ShareButton>
        </Header>
      </BackgroundImage>
      <Details>
        <AddressAndActions>
          <Address>
            <LocationIcon />
            <p>{discovery.address}</p>
          </Address>
          <Actions id={id} />
        </AddressAndActions>
        <DiscoveryName>{discovery.name.substring(0, 50)}</DiscoveryName>
        <ContactLinks>
          {discovery.directions && (
            <DirectionsButton
              onClick={() => window.open(discovery.directions)}
            />
          )}
          {discovery.phoneNumber && (
            <CallButton phoneNumber={"tel:" + discovery.phoneNumber} />
          )}
          {discovery.webUrl && (
            <WebsiteButton onClick={() => window.open(discovery.webUrl)} />
          )}
        </ContactLinks>
        <Notes>
          <h3>Notes</h3>
          <p>{discovery.notes}</p>
        </Notes>
      </Details>
    </Layout>
  );

  function handleCancel() {
    history.goBack();
  }
}

const Layout = styled.main`
  display: grid;
  grid-template-rows: 1fr min-content;
  grid-template-columns: 100%;
  height: 100vh;
`;
const Header = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
  grid-row: 1;
  display: grid;
  grid-template-columns: 23px 1fr 1fr 23px;
  grid-template-rows: 23px 1fr;
`;

const BackgroundImage = styled.section`
  background-image: url(${(props) => props.thumbnail});
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: -20px;
  background-position: center;
`;

const Details = styled.section`
  display: grid;
  grid-template-rows: repeat(4 1fr);
  grid-row-gap: 12px;
  grid-row-start: 2;
  background-color: var(--white);
  border-radius: 25px 25px 0 0;
  box-shadow: var(--center-box-shadow);
  padding: 20px;
  min-height: 40vh;
`;

const DiscoveryName = styled.h2`
  font-size: var(--size-lplus);
  grid-row: 2;
  display: flex;
  flex-direction: column;
`;

const AddressAndActions = styled.section`
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  align-items: center;
`;

const Address = styled.aside`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-size: var(--size-m);
  }
`;

const LocationIcon = styled(VscLocation)`
  font-size: 20px;
  color: var(--darkest-grey);
`;

const Actions = styled(ActionButtons)`
  justify-self: right;
`;

const ContactLinks = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  a {
    color: var(--darkest-grey);
    text-decoration: none;
  }
`;

const Notes = styled.aside`
  display: block;
  grid-column: 1/2;
  grid-row: 4;
`;

const BackButton = styled(MdKeyboardArrowLeft)`
  color: var(--white);
  font-size: 40px;
  justify-self: left;
  grid-column: 2;
  grid-row: 2;
`;

const ShareButton = styled.a`
  grid-column: 3;
  grid-row: 2;
  justify-self: right;
`;
const ShareIcon = styled(MdShare)`
  color: var(--white);
  font-size: 32px;
`;

const CopiedIcon = styled(RiCheckboxMultipleFill)`
  color: var(--white);
  font-size: 32px;
`;
