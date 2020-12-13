import React from "react";
import styled from "styled-components/macro";
import TimeAgo from "react-timeago/lib";

export default function Discovery({ discovery }) {
  return (
    <Layout>
      <Thumbnail>
        <img src={discovery.thumbnail} alt={discovery.name} />
      </Thumbnail>
      <DiscoveryPreview>
        <NameAndAddress>
          <h2>{discovery.name.substring(0, 40)}</h2>
          <p>{discovery.address}</p>
        </NameAndAddress>
        <CreationDate>
          <p>
            <TimeAgo date={discovery.timestamp} />
          </p>
        </CreationDate>
      </DiscoveryPreview>
    </Layout>
  );
}

const Layout = styled.main`
  background-color: var(--white);
  box-shadow: var(--center-box-shadow);
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  width: auto;
  height: auto;
`;

const Thumbnail = styled.aside`
  border-radius: 10px 10px 0 0;
  height: 140px;

  img {
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    height: 100%;
    width: 100%;
  }
`;

const DiscoveryPreview = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px;

  p {
    font-size: var(--size-m);
  }
`;

const NameAndAddress = styled.aside`
  h2 {
    font-size: var(--size-l);
  }
`;

const CreationDate = styled.aside`
  justify-self: right;

  p {
    font-size: var(--size-m);
    justify-self: right;
    text-align: right;
  }
`;
